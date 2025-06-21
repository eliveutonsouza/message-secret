import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { Clock, FileText } from "lucide-react";
import { Letter, PaymentStatus } from "@prisma/client";
import { LetterCardActions } from "../actions/action-letter-card";

interface LetterCardProps {
  letter: Letter;
}

export function LetterCard({ letter }: LetterCardProps) {
  const getStatusBadge = (letter: Letter) => {
    const now = new Date();
    const releaseDate = new Date(letter.releaseDate);

    // Primeiro verifica o status da carta
    if (letter.status === "DRAFT") {
      return (
        <CosmicBadge
          variant="cosmic-outline"
          className="border-yellow-400 text-yellow-400"
        >
          <FileText className="h-3 w-3 mr-1" />
          Rascunho
        </CosmicBadge>
      );
    }

    // Depois verifica o status do pagamento
    if (letter.paymentStatus !== PaymentStatus.PAID) {
      return (
        <CosmicBadge variant="cosmic-destructive">
          Pagamento Pendente
        </CosmicBadge>
      );
    }

    // Se está paga e ativa, mostra o status de liberação
    if (
      letter.status === "ACTIVE" &&
      letter.paymentStatus === PaymentStatus.PAID
    ) {
      if (releaseDate > now) {
        return (
          <CosmicBadge
            variant="cosmic-outline"
            className="border-blue-400 text-blue-400"
          >
            <Clock className="h-3 w-3 mr-1" />
            Ativa - Aguardando Liberação
          </CosmicBadge>
        );
      } else {
        return (
          <CosmicBadge variant="cosmic-success">
            <Clock className="h-3 w-3 mr-1" />
            Ativa - Liberada
          </CosmicBadge>
        );
      }
    }

    // Status padrão
    return <CosmicBadge variant="cosmic-outline">{letter.status}</CosmicBadge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <CosmicCard className="relative group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-purple-200 text-lg line-clamp-1">
            {letter.title || "Carta sem título"}
          </CardTitle>
          <LetterCardActions letter={letter} />
        </div>
        <div className="flex flex-wrap gap-2">
          {getStatusBadge(letter)}
          {letter.isFavorite && (
            <CosmicBadge
              variant="cosmic-outline"
              className="border-red-400 text-red-400"
            >
              ⭐ Favorita
            </CosmicBadge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-purple-300 text-sm line-clamp-3">
            {letter.content}
          </p>
          <div className="flex items-center text-purple-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Libera em: {formatDate(letter.releaseDate.toISOString())}
          </div>
        </div>
      </CardContent>
    </CosmicCard>
  );
}
