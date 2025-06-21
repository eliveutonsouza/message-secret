"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { CosmicButton } from "./ui/cosmic-button";

interface BuyButtonProps {
  onCreateLetter?: () => Promise<string | null>;
  disabled?: boolean;
}

export default function BuyButton({
  onCreateLetter,
  disabled,
}: BuyButtonProps) {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  async function handleClick(assinatura: boolean) {
    try {
      setIsCreatingCheckout(true);

      let testeId = "123"; // ID padrão para testes

      // Se foi fornecida uma função para criar a carta, use ela
      if (onCreateLetter) {
        const letterId = await onCreateLetter();
        if (letterId) {
          testeId = letterId;
        } else {
          // Se não conseguiu criar a carta, não continua
          return;
        }
      }

      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assinatura, testeId }),
      });

      const stripeClient = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
      );

      if (!stripeClient) throw new Error("Stripe failed to initialize.");

      const { sessionId } = await checkoutResponse.json();
      await stripeClient.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingCheckout(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <CosmicButton
        disabled={isCreatingCheckout || disabled}
        onClick={() => handleClick(false)}
        className="w-full"
        variant="cosmic"
      >
        {isCreatingCheckout ? "Processando..." : "Comprar"}
      </CosmicButton>
      <CosmicButton
        disabled={isCreatingCheckout || disabled}
        onClick={() => handleClick(true)}
        className="w-full"
        variant="cosmic-outline"
      >
        {isCreatingCheckout ? "Processando..." : "Assinar"}
      </CosmicButton>
    </div>
  );
}
