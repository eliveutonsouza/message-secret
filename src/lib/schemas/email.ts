import { z } from "zod"

export const sendEmailSchema = z.object({
  to: z.string().email("Email inválido").or(z.array(z.string().email())),
  subject: z.string().min(1, "Assunto é obrigatório"),
  template: z.enum(["magic-link", "letter-notification", "welcome", "payment-confirmation", "contact-form"]),
  data: z.record(z.any()),
})

export const magicLinkEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  url: z.string().url("URL inválida"),
  host: z.string().min(1, "Host é obrigatório"),
})

export const letterNotificationEmailSchema = z.object({
  recipientEmail: z.string().email("Email inválido"),
  letterTitle: z.string().optional(),
  letterUrl: z.string().url("URL inválida"),
  senderName: z.string().optional(),
  releaseDate: z.string(),
})

export const welcomeEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().optional(),
})

export type SendEmailInput = z.infer<typeof sendEmailSchema>
export type MagicLinkEmailInput = z.infer<typeof magicLinkEmailSchema>
export type LetterNotificationEmailInput = z.infer<typeof letterNotificationEmailSchema>
export type WelcomeEmailInput = z.infer<typeof welcomeEmailSchema>
