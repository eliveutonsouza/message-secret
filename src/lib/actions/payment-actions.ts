"use server"

import { auth } from "@/auth"
import { LetterService } from "@/lib/services/letter-service"
import { createPaymentSchema } from "@/lib/validations"
import { PaymentStatus } from "@prisma/client"

export async function createPaymentAction(letterId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const letter = await LetterService.getLetterById(letterId)
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" }
    }

    const validatedData = createPaymentSchema.parse({
      letterId,
      amount: 2.99,
      currency: "BRL",
      paymentMethod: "pix",
    })

    // Aqui integraria com Kwify
    // const paymentResponse = await kwifyService.createPayment(validatedData)

    // Por enquanto, simular pagamento
    const paymentId = `pay_${Date.now()}`

    return {
      success: true,
      paymentId,
      paymentUrl: `/payment/${letterId}/checkout`,
    }
  } catch (error: any) {
    if (error.errors) {
      return { error: "Dados inválidos", details: error.errors }
    }
    return { error: "Erro ao criar pagamento. Tente novamente." }
  }
}

export async function processPaymentWebhookAction(webhookData: any) {
  try {
    const { letterId, paymentId, status } = webhookData

    let paymentStatus: PaymentStatus
    switch (status) {
      case "paid":
      case "completed":
        paymentStatus = PaymentStatus.PAID
        break
      case "failed":
      case "cancelled":
        paymentStatus = PaymentStatus.FAILED
        break
      default:
        paymentStatus = PaymentStatus.PENDING
    }

    await LetterService.updatePaymentStatus(letterId, paymentStatus, paymentId)

    return { success: true }
  } catch (error) {
    return { error: "Erro ao processar webhook de pagamento" }
  }
}
