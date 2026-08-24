export type ContactValues = {
  name: string;
  contact: string;
  message: string;
  consent: boolean;
  website: string;
  turnstileToken: string;
};

export type ContactErrors = Partial<
  Record<"name" | "contact" | "message" | "consent", string>
>;

export const emptyContactValues: ContactValues = {
  name: "",
  contact: "",
  message: "",
  consent: false,
  website: "",
  turnstileToken: "",
};

export function validateContact(
  values: ContactValues,
  locale: "zh" | "en" = "zh",
): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const contact = values.contact.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = locale === "zh" ? "请告诉我怎么称呼你。" : "Please tell me your name.";
  } else if (name.length > 60) {
    errors.name = locale === "zh" ? "称呼请控制在 60 个字符以内。" : "Keep your name within 60 characters.";
  }

  if (!contact) {
    errors.contact = locale === "zh" ? "请至少留下一种联系方式。" : "Please leave at least one way to reach you.";
  } else if (contact.length > 120) {
    errors.contact = locale === "zh" ? "联系方式请控制在 120 个字符以内。" : "Keep contact details within 120 characters.";
  }

  if (message.length > 1000) {
    errors.message = locale === "zh" ? "留言请控制在 1000 个字符以内。" : "Keep the message within 1,000 characters.";
  }

  if (!values.consent) {
    errors.consent = locale === "zh" ? "提交前请确认联系授权。" : "Please confirm consent before submitting.";
  }

  return errors;
}
