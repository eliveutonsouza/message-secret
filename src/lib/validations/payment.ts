import { z } from "zod"

export const createPaymentSchema = z.object({
  letterId: z.string().cuid("ID da carta inválido"),
  amount: z.number().positive("Valor deve ser positivo"),
  currency: z.string().default("BRL"),
  paymentMethod: z.enum(["pix", "credit_card", "debit_card"]).default("pix"),
})

export const webhookPaymentSchema = z.object({
  letterId: z.string().cuid(),
  paymentId: z.string(),
  status: z.enum(["pending", "paid", "failed", "cancelled"]),
  amount: z.number().positive(),
  currency: z.string(),
  metadata: z.record(z.any()).optional(),
})

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type WebhookPaymentInput = z.infer<typeof webhookPaymentSchema>
