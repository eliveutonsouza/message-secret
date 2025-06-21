"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createLetterAction } from "@/lib/actions";
import { toast } from "sonner";
import type { CreateLetterInput } from "@/lib/schemas/letter";

interface BuyButtonProps {
  formData: CreateLetterInput;
  onSaveDraft?: () => void;
}

export default function BuyButton({ formData, onSaveDraft }: BuyButtonProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  async function handleClick() {
    try {
      setIsCreatingCheckout(true);

      // Primeiro cria a carta como rascunho
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title ?? "");
      formDataObj.append("content", formData.content);
      formDataObj.append("releaseDate", formData.releaseDate);
      formDataObj.append("status", "draft");

      const result = await createLetterAction(formDataObj);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (!result.error) {
        toast.error("Erro ao criar a carta. Tente novamente.");
        return;
      }

      // Se a carta foi criada com sucesso, redireciona para o checkout
      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assinatura: false,
          testeId: result.details?.letterId,
        }),
      });

      const stripeClient = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
      );

      if (!stripeClient) throw new Error("Stripe failed to initialize.");

      const { sessionId } = await checkoutResponse.json();
      await stripeClient.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao processar sua solicitação. Sua carta foi salva como rascunho."
      );
      if (onSaveDraft) onSaveDraft();
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Button
        onClick={handleClick}
        disabled={isCreatingCheckout}
        className="w-full flex items-center gap-2 shadow-md"
      >
        <Sparkles className="h-5 w-5" />
        {isCreatingCheckout ? "Processando..." : "Comprar Carta Cósmica"}
      </Button>
      <Button
        onClick={handleClick}
        disabled={isCreatingCheckout}
        className="w-full flex items-center gap-2 shadow-md"
      >
        <Sparkles className="h-5 w-5" />
        {isCreatingCheckout ? "Processando..." : "Assinar Carta Cósmica"}
      </Button>
    </div>
  );
}
