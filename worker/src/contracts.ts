export type EmailAddress = {
  email: string;
  name?: string;
};

export type EmailMessageBuilder = {
  to: string | EmailAddress | Array<string | EmailAddress>;
  from: string | EmailAddress;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string | EmailAddress;
  headers?: Record<string, string>;
};

export type EmailSendResult = {
  id?: string;
  success?: boolean;
};

export interface SendEmailLike {
  send(message: EmailMessageBuilder): Promise<EmailSendResult>;
}

export interface D1PreparedStatementLike {
  bind(...values: unknown[]): D1PreparedStatementLike;
  run(): Promise<{ success: boolean }>;
}

export interface D1DatabaseLike {
  prepare(sql: string): D1PreparedStatementLike;
}

export type ContactEnv = {
  DB: D1DatabaseLike;
  EMAIL: SendEmailLike;
  NOTIFICATION_FROM: string;
  NOTIFICATION_TO: string;
  TURNSTILE_SECRET: string;
};

export type LeadInput = {
  name: string;
  contact: string;
  message: string;
  turnstileToken: string;
};

export type ParseResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; code: string };

export type TurnstileResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
  action: string;
  cdata: string;
  metadata: { ephemeral_id: string };
};
