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

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const contact = values.contact.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "请告诉我怎么称呼你。";
  } else if (name.length > 60) {
    errors.name = "称呼请控制在 60 个字符以内。";
  }

  if (!contact) {
    errors.contact = "请至少留下一种联系方式。";
  } else if (contact.length > 120) {
    errors.contact = "联系方式请控制在 120 个字符以内。";
  }

  if (message.length > 1000) {
    errors.message = "留言请控制在 1000 个字符以内。";
  }

  if (!values.consent) {
    errors.consent = "提交前请确认联系授权。";
  }

  return errors;
}
