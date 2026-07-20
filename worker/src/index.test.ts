import { afterEach, describe, expect, it, vi } from "vitest";

import worker from "./index";
import type {
  ContactEnv,
  D1DatabaseLike,
  D1PreparedStatementLike,
  EmailMessageBuilder,
} from "./contracts";

type StoredLead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  created_at: string;
  notification_status: string;
};

class MemoryStatement implements D1PreparedStatementLike {
  private values: unknown[] = [];

  constructor(
    private readonly sql: string,
    private readonly rows: Map<string, StoredLead>,
  ) {}

  bind(...values: unknown[]) {
    this.values = values;
    return this;
  }

  async run() {
    if (this.sql.startsWith("INSERT")) {
      const [id, name, contact, message, createdAt, notificationStatus] =
        this.values as string[];
      this.rows.set(id, {
        id,
        name,
        contact,
        message,
        created_at: createdAt,
        notification_status: notificationStatus,
      });
    }

    if (this.sql.startsWith("UPDATE")) {
      const [notificationStatus, id] = this.values as string[];
      const row = this.rows.get(id);
      if (row) row.notification_status = notificationStatus;
    }

    return { success: true };
  }
}

class MemoryD1 implements D1DatabaseLike {
  readonly rows = new Map<string, StoredLead>();

  prepare(sql: string) {
    return new MemoryStatement(sql, this.rows);
  }
}

class MemoryEmail {
  readonly messages: EmailMessageBuilder[] = [];

  constructor(private readonly shouldFail = false) {}

  async send(message: EmailMessageBuilder) {
    if (this.shouldFail) throw new Error("email unavailable");
    this.messages.push(message);
    return { id: "email-1", success: true };
  }
}

const validPayload = {
  name: "林先生",
  contact: "lin@example.com",
  message: "想聊一个产品合作。",
  consent: true,
  website: "",
  turnstileToken: "verified-token",
};

function createEnv(options?: { emailFails?: boolean }) {
  const DB = new MemoryD1();
  const EMAIL = new MemoryEmail(options?.emailFails);
  const env: ContactEnv = {
    DB,
    EMAIL,
    NOTIFICATION_FROM: "website@260604.xyz",
    NOTIFICATION_TO: "2797375316@qq.com",
    TURNSTILE_SECRET: "turnstile-secret",
  };
  return { DB, EMAIL, env };
}

function request(
  body: unknown = validPayload,
  options?: { method?: string; origin?: string; rawBody?: string },
) {
  return new Request("https://contact-api.260604.xyz/", {
    method: options?.method ?? "POST",
    headers: {
      "content-type": "application/json",
      origin: options?.origin ?? "https://260604.xyz",
    },
    body:
      (options?.method ?? "POST") === "GET"
        ? undefined
        : options?.rawBody ?? JSON.stringify(body),
  });
}

function successfulTurnstile() {
  return {
    success: true,
    challenge_ts: "2026-07-20T06:00:00.000Z",
    hostname: "260604.xyz",
    "error-codes": [],
    action: "contact",
    cdata: "",
    metadata: { ephemeral_id: "" },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("contact Worker", () => {
  it("answers preflight for an allowed production origin", async () => {
    const { env } = createEnv();
    const response = await worker.fetch(
      request(undefined, { method: "OPTIONS" }),
      env,
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe(
      "https://260604.xyz",
    );
  });

  it("rejects origins outside the exact allowlist", async () => {
    const { env } = createEnv();
    const response = await worker.fetch(
      request(validPayload, { origin: "https://example.com" }),
      env,
    );

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ ok: false, code: "origin_denied" });
  });

  it("rejects unsupported methods and invalid JSON", async () => {
    const { env } = createEnv();
    const getResponse = await worker.fetch(
      request(undefined, { method: "GET" }),
      env,
    );
    const jsonResponse = await worker.fetch(
      request(undefined, { rawBody: "{" }),
      env,
    );

    expect(getResponse.status).toBe(405);
    expect(jsonResponse.status).toBe(400);
    expect(await jsonResponse.json()).toEqual({ ok: false, code: "invalid_json" });
  });

  it("rejects honeypot and invalid public fields before external calls", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { env } = createEnv();

    const spamResponse = await worker.fetch(
      request({ ...validPayload, website: "https://spam.example" }),
      env,
    );
    const invalidResponse = await worker.fetch(
      request({ ...validPayload, contact: "" }),
      env,
    );

    expect(spamResponse.status).toBe(400);
    expect(await spamResponse.json()).toEqual({ ok: false, code: "spam" });
    expect(invalidResponse.status).toBe(400);
    expect(await invalidResponse.json()).toEqual({
      ok: false,
      code: "invalid_contact",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a failed server-side Turnstile validation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        Response.json({
          success: false,
          challenge_ts: "",
          hostname: "",
          "error-codes": ["invalid-input-response"],
          action: "",
          cdata: "",
          metadata: { ephemeral_id: "" },
        }),
      ),
    );
    const { DB, env } = createEnv();

    const response = await worker.fetch(request(), env);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      ok: false,
      code: "turnstile_failed",
    });
    expect(DB.rows.size).toBe(0);
  });

  it("stores a minimal lead and sends the QQ notification", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json(successfulTurnstile())),
    );
    const { DB, EMAIL, env } = createEnv();

    const response = await worker.fetch(request(), env);
    const [lead] = [...DB.rows.values()];

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
    expect(lead).toMatchObject({
      name: "林先生",
      contact: "lin@example.com",
      message: "想聊一个产品合作。",
      notification_status: "sent",
    });
    expect(Object.keys(lead)).not.toContain("ip");
    expect(Object.keys(lead)).not.toContain("user_agent");
    expect(EMAIL.messages).toEqual([
      expect.objectContaining({
        from: "website@260604.xyz",
        to: "2797375316@qq.com",
        subject: "新的个人网站联系：林先生",
      }),
    ]);
  });

  it("keeps a stored lead when notification delivery fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json(successfulTurnstile())),
    );
    const { DB, env } = createEnv({ emailFails: true });

    const response = await worker.fetch(request(), env);
    const [lead] = [...DB.rows.values()];

    expect(response.status).toBe(201);
    expect(lead.notification_status).toBe("failed");
  });
});
