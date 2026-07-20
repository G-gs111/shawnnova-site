import type { ParseResult } from "./contracts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseLead(value: unknown): ParseResult {
  if (!isRecord(value)) return { ok: false, code: "invalid_body" };
  if (typeof value.website === "string" && value.website.trim()) {
    return { ok: false, code: "spam" };
  }
  if (value.consent !== true) {
    return { ok: false, code: "consent_required" };
  }

  if (
    typeof value.name !== "string" ||
    !value.name.trim() ||
    value.name.trim().length > 60
  ) {
    return { ok: false, code: "invalid_name" };
  }

  if (
    typeof value.contact !== "string" ||
    !value.contact.trim() ||
    value.contact.trim().length > 120
  ) {
    return { ok: false, code: "invalid_contact" };
  }

  if (
    typeof value.message !== "string" ||
    value.message.trim().length > 1000
  ) {
    return { ok: false, code: "invalid_message" };
  }

  if (
    typeof value.turnstileToken !== "string" ||
    !value.turnstileToken.trim()
  ) {
    return { ok: false, code: "turnstile_required" };
  }

  return {
    ok: true,
    lead: {
      name: value.name.trim(),
      contact: value.contact.trim(),
      message: value.message.trim(),
      turnstileToken: value.turnstileToken.trim(),
    },
  };
}
