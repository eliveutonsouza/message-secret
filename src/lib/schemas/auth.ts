import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  callbackUrl: z.string().optional(),
})

export const magicLinkSchema = z.object({
  email: z.string().email("Email inválido"),
  callbackUrl: z.string().url().optional(),
})

export const verifyTokenSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
  email: z.string().email("Email inválido"),
})

export type SignInInput = z.infer<typeof signInSchema>
export type MagicLinkInput = z.infer<typeof magicLinkSchema>
export type VerifyTokenInput = z.infer<typeof verifyTokenSchema>
