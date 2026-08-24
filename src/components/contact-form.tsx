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
  locale?: "zh" | "en";
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const formCopy = {
  zh: {
    verifyUnavailable: "安全验证暂时不可用，请刷新后重试。",
    verifyExpired: "安全验证已过期，请重新完成验证。",
    checkFields: "请检查标出的信息后再提交。",
    verifyFirst: "请完成人机验证后再提交。",
    serviceUnavailable: "联系服务正在配置中，请先通过邮箱或电话联系我。",
    success: "收到，我会通过你留下的方式联系你。",
    failed: "暂时没有发送成功，请重试或直接联系我。",
    received: "已收到",
    thanks: "谢谢你愿意留下信息，我会尽快回复。",
    name: "怎么称呼你",
    contact: "你的联系方式",
    contactPlaceholder: "邮箱、手机号或微信",
    message: "想聊些什么",
    messagePlaceholder: "合作想法、工作机会，或只是打个招呼",
    website: "个人网站",
    consent: "我同意将以上信息用于本次联系。",
    verification: "安全验证",
    submitting: "正在发送",
    submit: "留下联系方式",
  },
  en: {
    verifyUnavailable: "Verification is temporarily unavailable. Please refresh and try again.",
    verifyExpired: "Verification expired. Please complete it again.",
    checkFields: "Please check the highlighted information before submitting.",
    verifyFirst: "Please complete the human verification before submitting.",
    serviceUnavailable: "The contact service is being configured. Please email or call me instead.",
    success: "Received. I will reply using the contact method you provided.",
    failed: "The message was not sent. Please retry or contact me directly.",
    received: "Received",
    thanks: "Thank you for leaving your details. I will reply soon.",
    name: "Your name",
    contact: "How can I reach you?",
    contactPlaceholder: "Email, phone or WeChat",
    message: "What would you like to discuss?",
    messagePlaceholder: "A role, a project, or simply an introduction",
    website: "Website",
    consent: "I agree that this information may be used to contact me.",
    verification: "Human verification",
    submitting: "Sending",
    submit: "Leave my details",
  },
} as const;

export function ContactForm({ endpoint, turnstileSiteKey, locale = "zh" }: ContactFormProps) {
  const copy = formCopy[locale];
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
    if (!turnstileSiteKey || turnstileReady) return;

    const detectLoadedApi = () => {
      if (window.turnstile) setTurnstileReady(true);
    };

    detectLoadedApi();
    const detectionTimer = window.setInterval(detectLoadedApi, 100);
    return () => window.clearInterval(detectionTimer);
  }, [turnstileReady, turnstileSiteKey]);

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
          setStatusMessage(copy.verifyUnavailable);
        },
        "expired-callback": () => {
          setValues((current) => ({ ...current, turnstileToken: "" }));
          setStatusMessage(copy.verifyExpired);
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
  }, [copy.verifyExpired, copy.verifyUnavailable, turnstileReady, turnstileSiteKey]);

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
    const nextErrors = validateContact(values, locale);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setStatusMessage(copy.checkFields);
      return;
    }

    if (!values.turnstileToken) {
      setStatus("error");
      setStatusMessage(copy.verifyFirst);
      return;
    }

    if (!endpoint) {
      setStatus("error");
      setStatusMessage(copy.serviceUnavailable);
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
      setStatusMessage(copy.success);
    } catch {
      setStatus("error");
      setStatusMessage(copy.failed);
      setValues((current) => ({ ...current, turnstileToken: "" }));
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <span>{copy.received}</span>
        <h3>{statusMessage}</h3>
        <p>{copy.thanks}</p>
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
        <label htmlFor="contact-name">{copy.name}</label>
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
        <span className="form-error" id="contact-name-error">
          {errors.name ?? ""}
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-route">{copy.contact}</label>
        <input
          id="contact-route"
          name="contact"
          autoComplete="email"
          maxLength={120}
          placeholder={copy.contactPlaceholder}
          value={values.contact}
          aria-describedby={errors.contact ? "contact-route-error" : undefined}
          aria-invalid={Boolean(errors.contact)}
          onChange={(event) => updateValue("contact", event.target.value)}
        />
        <span className="form-error" id="contact-route-error">
          {errors.contact ?? ""}
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">{copy.message}</label>
        <textarea
          id="contact-message"
          name="message"
          maxLength={1000}
          rows={5}
          placeholder={copy.messagePlaceholder}
          value={values.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => updateValue("message", event.target.value)}
        />
        <span className="form-error" id="contact-message-error">
          {errors.message ?? ""}
        </span>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">{copy.website}</label>
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
        <span>{copy.consent}</span>
      </label>
      <span className="form-error">{errors.consent ?? ""}</span>

      <div className="turnstile-slot" ref={turnstileElement} aria-label={copy.verification} />

      <div className="form-submit-row">
        <button
          className="button button-primary"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? copy.submitting : copy.submit}
          <PaperPlaneTilt size={17} weight="regular" aria-hidden="true" />
        </button>
        <p className={`form-status form-status-${status}`} aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
