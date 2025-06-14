import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  callbackUrl: z.string().optional(),
});

export const magicLinkSchema = z.object({
  email: z.string().email("Email inválido"),
  callbackUrl: z
    .string()
    .refine((val) => !val || val.startsWith("http") || val.startsWith("/"), {
      message: "callbackUrl deve ser uma URL ou path relativo",
    })
    .optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
