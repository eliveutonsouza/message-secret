"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState, useCallback } from "react";
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

  const handleClick = useCallback(async () => {
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
        body: JSON.stringify({ assinatura: false, testeId }),
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
  }, [onCreateLetter]);

  return (
    <CosmicButton
      disabled={isCreatingCheckout || disabled}
      onClick={handleClick}
      className="w-full"
      variant="cosmic"
    >
      {isCreatingCheckout ? "Processando..." : "Comprar Carta Cósmica"}
    </CosmicButton>
  );
}
