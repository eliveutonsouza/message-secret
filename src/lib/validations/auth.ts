import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  callbackUrl: z.string().optional(),
})

export const magicLinkSchema = z.object({
  email: z.string().email("Email inválido"),
  callbackUrl: z.string().url().optional(),
})

export type SignInInput = z.infer<typeof signInSchema>
export type MagicLinkInput = z.infer<typeof magicLinkSchema>
