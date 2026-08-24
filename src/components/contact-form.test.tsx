import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

describe("ContactForm", () => {
  beforeEach(() => {
    Object.defineProperty(window, "turnstile", {
      configurable: true,
      value: {
        remove: vi.fn(),
        render: vi.fn(
          (_element: HTMLElement, options: { callback: (token: string) => void }) => {
            options.callback("verified-token");
            return "widget-id";
          },
        ),
        reset: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows useful validation messages before sending", async () => {
    render(
      <ContactForm
        endpoint="https://contact-api.260604.xyz"
        turnstileSiteKey="test-site-key"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "留下联系方式" }));

    expect(await screen.findByText("请告诉我怎么称呼你。")).toBeVisible();
    expect(screen.getByText("请至少留下一种联系方式。")).toBeVisible();
    expect(screen.getByText("提交前请确认联系授权。")).toBeVisible();
  });

  it("provides an English form and English validation", async () => {
    render(
      <ContactForm
        endpoint="https://contact-api.260604.xyz"
        turnstileSiteKey="test-site-key"
        locale="en"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Leave my details" }));

    expect(await screen.findByText("Please tell me your name.")).toBeVisible();
    expect(screen.getByText("Please leave at least one way to reach you.")).toBeVisible();
    expect(screen.getByText("Please confirm consent before submitting.")).toBeVisible();
  });

  it("initializes Turnstile when the API becomes available after mount", async () => {
    window.turnstile = undefined;
    const renderWidget = vi.fn(
      (_element: HTMLElement, options: { callback: (token: string) => void }) => {
        options.callback("late-turnstile-token");
        return "late-widget-id";
      },
    );

    render(
      <ContactForm
        endpoint="https://contact-api.260604.xyz"
        turnstileSiteKey="test-site-key"
      />,
    );

    window.turnstile = {
      remove: vi.fn(),
      render: renderWidget,
      reset: vi.fn(),
    };

    await waitFor(() => expect(renderWidget).toHaveBeenCalledTimes(1));
  });

  it("submits exact values and shows the success state", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ContactForm
        endpoint="https://contact-api.260604.xyz"
        turnstileSiteKey="test-site-key"
      />,
    );

    fireEvent.change(screen.getByLabelText("怎么称呼你"), {
      target: { value: "林先生" },
    });
    fireEvent.change(screen.getByLabelText("你的联系方式"), {
      target: { value: "lin@example.com" },
    });
    fireEvent.change(screen.getByLabelText("想聊些什么"), {
      target: { value: "想聊一个产品合作。" },
    });
    fireEvent.click(screen.getByRole("checkbox", { name: /我同意/ }));
    fireEvent.click(screen.getByRole("button", { name: "留下联系方式" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "https://contact-api.260604.xyz",
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "林先生",
          contact: "lin@example.com",
          message: "想聊一个产品合作。",
          consent: true,
          website: "",
          turnstileToken: "verified-token",
        }),
      }),
    );
    expect(
      await screen.findByText("收到，我会通过你留下的方式联系你。"),
    ).toBeVisible();
  });

  it("keeps typed values when the service asks for a retry", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(
      <ContactForm
        endpoint="https://contact-api.260604.xyz"
        turnstileSiteKey="test-site-key"
      />,
    );

    const name = screen.getByLabelText("怎么称呼你");
    const contact = screen.getByLabelText("你的联系方式");
    fireEvent.change(name, { target: { value: "林先生" } });
    fireEvent.change(contact, { target: { value: "lin@example.com" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /我同意/ }));
    fireEvent.click(screen.getByRole("button", { name: "留下联系方式" }));

    expect(
      await screen.findByText("暂时没有发送成功，请重试或直接联系我。"),
    ).toBeVisible();
    expect(name).toHaveValue("林先生");
    expect(contact).toHaveValue("lin@example.com");
  });
});
