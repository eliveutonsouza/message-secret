import { z } from "zod";

export const createLetterSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(5000, "Mensagem muito longa"),
  releaseDate: z.string().refine(
    (date) => {
      const selectedDate = new Date(date);
      const now = new Date();
      return selectedDate > now;
    },
    {
      message: "Data deve ser no futuro",
    }
  ),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  accessPassword: z
    .string()
    .min(4, "Senha muito curta")
    .max(32, "Senha muito longa")
    .optional()
    .or(z.literal("")),
  maxViews: z.string().optional().or(z.literal("")),
  expiresAt: z.string().optional().or(z.literal("")),
});

export const updateLetterSchema = z.object({
  title: z.string().max(100, "Título muito longo").optional(),
  content: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(5000, "Mensagem muito longa")
    .optional(),
  releaseDate: z
    .string()
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const now = new Date();
        return selectedDate > now;
      },
      {
        message: "Data deve ser no futuro",
      }
    )
    .optional(),
  isFavorite: z.boolean().optional(),
  accessPassword: z
    .string()
    .min(4, "Senha muito curta")
    .max(32, "Senha muito longa")
    .optional()
    .or(z.literal("")),
  maxViews: z.string().optional().or(z.literal("")),
  expiresAt: z.string().optional().or(z.literal("")),
});

export const letterFiltersSchema = z.object({
  status: z.enum(["all", "pending", "paid", "failed"]).default("all"),
  favorite: z.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(["createdAt", "releaseDate", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const shareLetterSchema = z.object({
  letterId: z.string().cuid("ID da carta inválido"),
  recipientEmail: z.string().email("Email inválido"),
  message: z.string().max(500, "Mensagem muito longa").optional(),
});

export type CreateLetterInput = z.infer<typeof createLetterSchema>;
export type UpdateLetterInput = z.infer<typeof updateLetterSchema>;
export type LetterFiltersInput = z.infer<typeof letterFiltersSchema>;
export type ShareLetterInput = z.infer<typeof shareLetterSchema>;
