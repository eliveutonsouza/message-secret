"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Heart,
  ArrowLeft,
  Copy,
  CreditCard,
  Clock,
  Eye,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LetterPreview {
  id: string;
  title?: string | null;
  releaseDate: string | Date;
  isFavorite?: boolean;
  status: string;
  uniqueLink: string;
  createdAt: string | Date;
}

interface PreviewLetterClientProps {
  letter: LetterPreview;
  canBeViewed: boolean;
  timeUntilRelease: number;
}

export function PreviewLetterClient({
  letter,
  canBeViewed: initialCanBeViewed,
  timeUntilRelease: initialTimeUntilRelease,
}: PreviewLetterClientProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeUntilRelease);
  const [canBeViewed, setCanBeViewed] = useState(initialCanBeViewed);
  const [origin, setOrigin] = useState("");

  const releaseDate =
    typeof letter.releaseDate === "string"
      ? new Date(letter.releaseDate)
      : letter.releaseDate;

  const formattedDate = format(
    releaseDate,
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    {
      locale: ptBR,
    }
  );

  useEffect(() => {
    // Define a origem apenas no cliente
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const releaseTime = releaseDate.getTime();
      const difference = releaseTime - now;

      if (difference > 0) {
        setTimeLeft(difference);
        setCanBeViewed(false);
      } else {
        setTimeLeft(0);
        setCanBeViewed(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  const formatTimeLeft = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const copyShareLink = async () => {
    if (!origin) return;

    const shareUrl = `${origin}/letter/${letter.uniqueLink}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado para a área de transferência!");
    } catch {
      toast.error("Erro ao copiar link");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Botão voltar */}
      <div className="mb-6">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="text-purple-300 hover:text-purple-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>

      {/* Cabeçalho da carta */}
      <div className="text-center space-y-4 mb-8">
        {letter.title && (
          <h1 className="text-3xl font-bold text-white">{letter.title}</h1>
        )}
        <div className="flex items-center justify-center gap-6 text-purple-200 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Liberação: {formattedDate}</span>
          </div>
          {letter.isFavorite && (
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 fill-red-400 text-red-400" />
              <span>Favorita</span>
            </div>
          )}
        </div>
      </div>

      {/* Countdown */}
      {!canBeViewed && (
        <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-blue-900/50 rounded-xl p-8 border border-purple-700/50 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-purple-200 mb-4">
              <Clock className="h-8 w-8" />
              <span className="text-xl font-medium">Liberação em:</span>
            </div>
            <div className="text-4xl font-bold text-white mb-4">
              {formatTimeLeft(timeLeft)}
            </div>
            <p className="text-purple-300">
              A carta será liberada automaticamente na data e horário
              especificados
            </p>
          </div>
        </div>
      )}

      {/* Skeleton do conteúdo */}
      <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-blue-900/50 rounded-xl p-8 border border-purple-700/50 shadow-xl mb-8">
        <div className="space-y-4">
          <div className="h-6 bg-purple-700/50 rounded animate-pulse"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-3/4"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-5/6"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-2/3"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-4/5"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-3/5"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-7/8"></div>
          <div className="h-6 bg-purple-700/50 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="text-center text-purple-300 text-lg mt-8">
          ✨ Conteúdo oculto até a data de liberação ✨
        </div>
      </div>

      {/* Link de compartilhamento */}
      <div className="bg-gradient-to-r from-purple-900/30 via-purple-800/30 to-blue-900/30 rounded-xl p-6 border border-purple-700/30 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="h-5 w-5 text-purple-300" />
              <p className="text-purple-200 font-medium">
                Link de compartilhamento:
              </p>
            </div>
            <p className="text-purple-300 text-sm break-all">
              {origin
                ? `${origin}/letter/${letter.uniqueLink}`
                : "Carregando..."}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyShareLink}
            className="text-purple-300 hover:text-purple-200 ml-4"
            disabled={!origin}
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-4">
        {letter.status === "DRAFT" && (
          <Link href={`/payment/${letter.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 text-lg">
              <CreditCard className="mr-2 h-5 w-5" />
              Comprar Carta
            </Button>
          </Link>
        )}

        {letter.status === "ACTIVE" && canBeViewed && (
          <Link
            href={`/letter/${letter.uniqueLink}`}
            target="_blank"
            className="flex-1"
          >
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 text-lg">
              <Eye className="mr-2 h-5 w-5" />
              Visualizar Carta
            </Button>
          </Link>
        )}

        <Link href="/dashboard" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-purple-600 text-purple-300 hover:bg-purple-600/10 h-12 text-lg"
          >
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>

      {/* Status da carta */}
      <div className="text-center text-purple-300 text-sm mt-8 p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
        <p className="mb-2">
          Status:{" "}
          <span className="text-purple-200 font-medium">{letter.status}</span>
        </p>
        {letter.status === "ACTIVE" && (
          <p className="text-green-300">
            ✅ Carta ativa e disponível para visualização pública
          </p>
        )}
        {letter.status === "DRAFT" && (
          <p className="text-yellow-300">
            ⏳ Carta em rascunho - aguardando pagamento para ativação
          </p>
        )}
      </div>
    </div>
  );
}
