import { type NextRequest, NextResponse } from "next/server";
import { LetterService } from "@/lib/services/letter-service";
import { PaymentStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Aqui você validaria o webhook do Kwify
    // const isValidWebhook = validateKwifyWebhook(body, request.headers)
    // if (!isValidWebhook) {
    //   return NextResponse.json({ error: 'Webhook inválido' }, { status: 401 })
    // }

    const { letterId, paymentId, status } = body;

    let paymentStatus: PaymentStatus;
    switch (status) {
      case "paid":
      case "completed":
        paymentStatus = PaymentStatus.PAID;
        break;
      case "failed":
      case "cancelled":
        paymentStatus = PaymentStatus.FAILED;
        break;
      default:
        paymentStatus = PaymentStatus.PENDING;
    }

    const updatedLetter = await LetterService.updatePaymentStatus(
      letterId,
      paymentStatus,
      paymentId
    );

    console.log(
      `Pagamento atualizado para carta ${letterId}: ${paymentStatus}`
    );

    return NextResponse.json({
      message: "Webhook processado com sucesso",
      letter: updatedLetter,
    });
  } catch (error) {
    console.error("Erro ao processar webhook de pagamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
