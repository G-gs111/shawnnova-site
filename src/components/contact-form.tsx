"use client";

import { PaperPlaneTilt } from "@phosphor-icons/react";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  emptyContactValues,
  type ContactErrors,
  type ContactValues,
  validateContact,
} from "@/lib/contact";

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  theme: "auto";
};

declare global {
  interface Window {
    turnstile?: {
      remove: (widgetId: string) => void;
      render: (element: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
    };
  }
}

type ContactFormProps = {
  endpoint: string;
  turnstileSiteKey: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ endpoint, turnstileSiteKey }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile),
  );
  const turnstileElement = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (
      !turnstileReady ||
      !turnstileSiteKey ||
      !turnstileElement.current ||
      !window.turnstile ||
      turnstileWidgetId.current
    ) {
      return;
    }

    turnstileWidgetId.current = window.turnstile.render(
      turnstileElement.current,
      {
        sitekey: turnstileSiteKey,
        callback: (token) => {
          setValues((current) => ({ ...current, turnstileToken: token }));
          setStatusMessage("");
        },
        "error-callback": () => {
          setValues((current) => ({ ...current, turnstileToken: "" }));
          setStatusMessage("安全验证暂时不可用，请刷新后重试。");
        },
        "expired-callback": () => {
          setValues((current) => ({ ...current, turnstileToken: "" }));
          setStatusMessage("安全验证已过期，请重新完成验证。");
        },
        theme: "auto",
      },
    );

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileReady, turnstileSiteKey]);

  function updateValue<Key extends keyof ContactValues>(
    key: Key,
    value: ContactValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setStatusMessage("请检查标出的信息后再提交。");
      return;
    }

    if (!values.turnstileToken) {
      setStatus("error");
      setStatusMessage("请完成人机验证后再提交。");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      setStatusMessage("联系服务正在配置中，请先通过邮箱或电话联系我。");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setStatus("success");
      setStatusMessage("收到，我会通过你留下的方式联系你。");
    } catch {
      setStatus("error");
      setStatusMessage("暂时没有发送成功，请重试或直接联系我。");
      setValues((current) => ({ ...current, turnstileToken: "" }));
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <span>已收到</span>
        <h3>{statusMessage}</h3>
        <p>谢谢你愿意留下信息，我会尽快回复。</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {turnstileSiteKey ? (
        <script
          async
          defer
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onLoad={() => setTurnstileReady(true)}
        />
      ) : null}

      <div className="form-field">
        <label htmlFor="contact-name">怎么称呼你</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          maxLength={60}
          value={values.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => updateValue("name", event.target.value)}
        />
        {errors.name ? (
          <span className="form-error" id="contact-name-error">
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-route">你的联系方式</label>
        <input
          id="contact-route"
          name="contact"
          autoComplete="email"
          maxLength={120}
          placeholder="邮箱、手机号或微信"
          value={values.contact}
          aria-describedby={errors.contact ? "contact-route-error" : undefined}
          aria-invalid={Boolean(errors.contact)}
          onChange={(event) => updateValue("contact", event.target.value)}
        />
        {errors.contact ? (
          <span className="form-error" id="contact-route-error">
            {errors.contact}
          </span>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">想聊些什么</label>
        <textarea
          id="contact-message"
          name="message"
          maxLength={1000}
          rows={5}
          placeholder="合作想法、工作机会，或只是打个招呼"
          value={values.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => updateValue("message", event.target.value)}
        />
        {errors.message ? (
          <span className="form-error" id="contact-message-error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">个人网站</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
        />
      </div>

      <label className="form-consent">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => updateValue("consent", event.target.checked)}
        />
        <span>我同意将以上信息用于本次联系。</span>
      </label>
      {errors.consent ? <span className="form-error">{errors.consent}</span> : null}

      <div className="turnstile-slot" ref={turnstileElement} aria-label="安全验证" />

      <div className="form-submit-row">
        <button
          className="button button-primary"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "正在发送" : "留下联系方式"}
          <PaperPlaneTilt size={17} weight="regular" aria-hidden="true" />
        </button>
        <p className={`form-status form-status-${status}`} aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
