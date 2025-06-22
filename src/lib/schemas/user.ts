import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .optional(),
  email: z.string().email("Email inválido").optional(),
  image: z.string().url("URL inválida").optional(),
});

export const userPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  theme: z.enum(["light", "dark", "cosmic"]).default("cosmic"),
  language: z.enum(["pt", "en"]).default("pt"),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  subject: z
    .string()
    .min(1, "Assunto é obrigatório")
    .max(200, "Assunto muito longo"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
