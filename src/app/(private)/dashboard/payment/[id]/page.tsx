"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PaymentPageProps {
  params: {
    id: string;
  };
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para o checkout
    const redirectToCheckout = async () => {
      try {
        const response = await fetch("/api/create-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assinatura: false,
            testeId: params.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao criar checkout");
        }

        const { sessionId } = await response.json();

        // Redireciona para o Stripe
        const stripe = await import("@stripe/stripe-js").then((m) =>
          m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string)
        );

        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        }
      } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        toast.error("Erro ao processar pagamento. Tente novamente.");
      }
    };

    redirectToCheckout();
  }, [params.id]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <CosmicCard className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-full">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">
            Processando Pagamento...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-purple-200">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Redirecionando para o checkout seguro</span>
          </div>
          <p className="text-purple-300 text-sm">
            Você será redirecionado para a página de pagamento do Stripe em
            instantes.
          </p>
          <CosmicButton
            onClick={() => router.push("/dashboard")}
            variant="cosmic-outline"
            className="w-full"
          >
            Voltar ao Dashboard
          </CosmicButton>
        </CardContent>
      </CosmicCard>
    </div>
  );
}
