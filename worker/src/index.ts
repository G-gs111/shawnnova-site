import type {
  ContactEnv,
  D1DatabaseLike,
  LeadInput,
  TurnstileResponse,
} from "./contracts";
import { parseLead } from "./validation";

const allowedOrigins = new Set([
  "https://260604.xyz",
  "https://www.260604.xyz",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function corsHeaders(origin: string) {
  return {
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-origin": origin,
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function json(
  body: { ok: boolean; code?: string },
  status: number,
  origin?: string,
) {
  return Response.json(body, {
    status,
    headers: origin ? corsHeaders(origin) : { vary: "Origin" },
  });
}

async function verifyTurnstile(token: string, env: ContactEnv) {
  const form = new FormData();
  form.set("secret", env.TURNSTILE_SECRET);
  form.set("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: form },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResponse;
  return (
    result.success &&
    (result.hostname === "260604.xyz" || result.hostname === "www.260604.xyz")
  );
}

async function storeLead(
  DB: D1DatabaseLike,
  id: string,
  lead: LeadInput,
  createdAt: string,
) {
  await DB.prepare(
    "INSERT INTO leads (id, name, contact, message, created_at, notification_status) VALUES (?, ?, ?, ?, ?, ?)",
  )
    .bind(id, lead.name, lead.contact, lead.message, createdAt, "pending")
    .run();
}

async function updateNotificationStatus(
  DB: D1DatabaseLike,
  id: string,
  status: "sent" | "failed",
) {
  await DB.prepare(
    "UPDATE leads SET notification_status = ? WHERE id = ?",
  )
    .bind(status, id)
    .run();
}

async function notifyOwner(env: ContactEnv, id: string, lead: LeadInput) {
  try {
    await env.EMAIL.send({
      from: env.NOTIFICATION_FROM,
      to: env.NOTIFICATION_TO,
      subject: `新的个人网站联系：${lead.name}`,
      text: [
        `称呼：${lead.name}`,
        `联系方式：${lead.contact}`,
        `留言：${lead.message || "未填写"}`,
        `线索编号：${id}`,
      ].join("\n"),
    });
    await updateNotificationStatus(env.DB, id, "sent");
  } catch {
    await updateNotificationStatus(env.DB, id, "failed");
  }
}

async function handleRequest(request: Request, env: ContactEnv) {
  const origin = request.headers.get("origin") ?? "";
  if (!allowedOrigins.has(origin)) {
    return json({ ok: false, code: "origin_denied" }, 403);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json({ ok: false, code: "method_not_allowed" }, 405, origin);
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json({ ok: false, code: "unsupported_media_type" }, 415, origin);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    return json({ ok: false, code: "body_too_large" }, 413, origin);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400, origin);
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return json({ ok: false, code: parsed.code }, 400, origin);
  }

  let turnstileIsValid = false;
  try {
    turnstileIsValid = await verifyTurnstile(parsed.lead.turnstileToken, env);
  } catch {
    turnstileIsValid = false;
  }
  if (!turnstileIsValid) {
    return json({ ok: false, code: "turnstile_failed" }, 400, origin);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  try {
    await storeLead(env.DB, id, parsed.lead, createdAt);
  } catch {
    return json({ ok: false, code: "storage_failed" }, 503, origin);
  }

  await notifyOwner(env, id, parsed.lead);
  return json({ ok: true }, 201, origin);
}

export default {
  fetch: handleRequest,
};
