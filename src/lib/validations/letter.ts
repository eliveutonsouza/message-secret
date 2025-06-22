import { z } from "zod";

export const createLetterSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo"),
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
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
});

export const updateLetterSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo"),
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
});

export const letterFiltersSchema = z.object({
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  favorite: z.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(["createdAt", "releaseDate", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateLetterInput = z.infer<typeof createLetterSchema>;
export type UpdateLetterInput = z.infer<typeof updateLetterSchema>;
export type LetterFiltersInput = z.infer<typeof letterFiltersSchema>;
