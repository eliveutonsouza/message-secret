import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { activateLetterActionFromWebhook } from "@/lib/actions/letter-actions";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!secret || !signature) {
      throw new Error("Missing secret or signature");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);
    console.log("Webhook recebido:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        if (event.data.object.payment_status === "paid") {
          // pagagamento por cartão com sucesso
          const testeId = event.data.object.metadata?.testeId;
          console.log("pagagamento por cartão com sucesso", testeId);

          if (testeId) {
            console.log("Ativando carta com ID:", testeId);
            const result = await activateLetterActionFromWebhook(testeId);
            console.log("Resultado da ativação:", result);
          } else {
            console.log("testeId não encontrado no metadata");
          }
        }

        if (
          event.data.object.payment_status === "unpaid" &&
          event.data.object.payment_intent
        ) {
          // Pagamento por boleto
          const paymentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent.toString()
          );

          const hostedVoucherUrl =
            paymentIntent.next_action?.boleto_display_details
              ?.hosted_voucher_url;

          if (hostedVoucherUrl) {
            // O cliente gerou um boleto, manda um email pra ele
            console.log("gerou o boleto e o link é", hostedVoucherUrl);
          }
        }
        break;

      case "checkout.session.expired":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente saiu do checkout e expirou :(
          const testeId = event.data.object.metadata?.testeId;
          console.log("checkout expirado", testeId);
        }
        break;

      case "checkout.session.async_payment_succeeded":
        if (event.data.object.payment_status === "paid") {
          // O cliente pagou o boleto e o pagamento foi confirmado
          const testeId = event.data.object.metadata?.testeId;
          console.log("pagamento boleto confirmado", testeId);

          if (testeId) {
            console.log("Ativando carta com ID (boleto):", testeId);
            const result = await activateLetterActionFromWebhook(testeId);
            console.log("Resultado da ativação (boleto):", result);
          } else {
            console.log("testeId não encontrado no metadata (boleto)");
          }
        }
        break;

      case "checkout.session.async_payment_failed":
        if (event.data.object.payment_status === "unpaid") {
          // O cliente não pagou o boleto e ele venceu :(
          const testeId = event.data.object.metadata?.testeId;
          console.log("pagamento boleto falhou", testeId);
        }
        break;

      case "customer.subscription.deleted":
        // O cliente cancelou o plano :(
        break;
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `Webhook error: ${error}`,
        ok: false,
      },
      { status: 500 }
    );
  }
}
