import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { LetterService } from "@/lib/services/letter-service";
import { PaymentStatus } from "@prisma/client";

// Função segura para comparação de assinaturas
function isSignatureValid(
  secret: string,
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;

  const expectedSignature = crypto
    .createHmac("sha1", secret)
    .update(rawBody)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

export async function POST(request: NextRequest) {
  try {
    const rawBodyBuffer = await request.arrayBuffer();
    const rawBody = Buffer.from(rawBodyBuffer).toString("utf-8");

    const { searchParams } = new URL(request.url);
    const signature = searchParams.get("signature");

    const secret = process.env.KIWIFY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!isSignatureValid(secret, rawBody, signature)) {
      console.warn("Webhook signature verification failed.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const body = JSON.parse(rawBody);

    const { order_id, order_status, payment_method, webhook_event_type } = body;

    if (!order_id || !order_status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let paymentStatus: PaymentStatus;
    switch (order_status) {
      case "paid":
        paymentStatus = PaymentStatus.PAID;
        break;
      case "refused":
      case "refunded":
      case "chargedback":
        paymentStatus = PaymentStatus.FAILED;
        break;
      default:
        paymentStatus = PaymentStatus.PENDING;
        break;
    }

    await LetterService.updatePaymentStatus(order_id, paymentStatus);

    console.log(
      `[Kiwify Webhook] Pedido: ${order_id} | Status: ${order_status} | Método: ${payment_method} | Evento: ${webhook_event_type}`
    );

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Erro ao processar webhook de pagamento:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
