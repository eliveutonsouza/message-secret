import { z } from "zod"

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo").optional(),
  email: z.string().email("Email inválido").optional(),
  image: z.string().url("URL inválida").optional(),
})

export const userPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  theme: z.enum(["light", "dark", "cosmic"]).default("cosmic"),
  language: z.enum(["pt", "en"]).default("pt"),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>
