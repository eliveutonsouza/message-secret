"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Heart,
  Copy,
  Clock,
  Share2,
  Sparkles,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { CosmicButton } from "@/components/ui/cosmic-button";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { CosmicProgress } from "@/components/ui/cosmic-progress";
import { CosmicSeparator } from "@/components/ui/cosmic-separator";
import { toast } from "sonner";
import type { Letter } from "@prisma/client";
import { PaymentStatus } from "@prisma/client";

interface LetterViewProps {
  letter: Letter;
}

export function LetterView({ letter }: LetterViewProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [canBeViewed, setCanBeViewed] = useState(false);
  const [origin, setOrigin] = useState("");

  const releaseDate = useMemo(
    () => new Date(letter.releaseDate),
    [letter.releaseDate]
  );
  const formattedDate = format(
    releaseDate,
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    {
      locale: ptBR,
    }
  );

  useEffect(() => {
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

  // Verifica se a carta pode ser visualizada
  if (letter.paymentStatus !== PaymentStatus.PAID) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-white">
        <CosmicCard className="max-w-md text-center">
          <CardContent className="p-8">
            <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-200 mb-4">
              Carta Não Ativada
            </h2>
            <p className="text-purple-300 mb-6">
              Esta carta ainda não foi ativada. O pagamento pode estar pendente.
            </p>
            <CosmicSeparator className="my-6" />
            <Link href="/">
              <CosmicButton>Criar Minha Carta</CosmicButton>
            </Link>
          </CardContent>
        </CosmicCard>
      </div>
    );
  }

  const totalDuration =
    releaseDate.getTime() - new Date(letter.createdAt).getTime();
  const elapsed = totalDuration - timeLeft;
  const progressPercentage =
    totalDuration > 0 ? (elapsed / totalDuration) * 100 : 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-4xl">
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
        {!canBeViewed ? (
          <CosmicCard className="text-center mb-8">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CosmicBadge variant="cosmic-outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Carta Temporal
                </CosmicBadge>
              </div>
              <CardTitle className="text-2xl md:text-3xl cosmic-text-glow">
                {letter.title || "Carta Misteriosa"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-8">
                <Clock className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-xl font-semibold text-purple-200 mb-4">
                  Esta mensagem ainda está viajando pelo espaço-tempo...
                </h2>
                <p className="text-purple-300 mb-6">Ela será revelada em:</p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <CosmicCard className="p-4">
                  <div className="text-2xl font-bold text-purple-200">
                    {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-purple-400">Dias</div>
                </CosmicCard>
                <CosmicCard className="p-4">
                  <div className="text-2xl font-bold text-purple-200">
                    {Math.floor(
                      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    )}
                  </div>
                  <div className="text-sm text-purple-400">Horas</div>
                </CosmicCard>
                <CosmicCard className="p-4">
                  <div className="text-2xl font-bold text-purple-200">
                    {Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}
                  </div>
                  <div className="text-sm text-purple-400">Min</div>
                </CosmicCard>
                <CosmicCard className="p-4">
                  <div className="text-2xl font-bold text-purple-200">
                    {Math.floor((timeLeft % (1000 * 60)) / 1000)}
                  </div>
                  <div className="text-sm text-purple-400">Seg</div>
                </CosmicCard>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-purple-400 mb-2">
                  <span>Progresso da jornada temporal</span>
                  <span>{progressPercentage.toFixed(1)}%</span>
                </div>
                <CosmicProgress value={progressPercentage} className="h-3" />
              </div>

              <CosmicCard className="p-4 mb-6">
                <p className="text-purple-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Data de liberação:
                </p>
                <p className="text-purple-200 font-medium">{formattedDate}</p>
              </CosmicCard>

              <CosmicCard className="p-4">
                <p className="text-purple-300 italic text-sm">
                  &quot;O amor não conhece distância nem tempo. Ele simplesmente
                  é, como as estrelas que brilham há milhões de anos.&quot;
                </p>
              </CosmicCard>
            </CardContent>
          </CosmicCard>
        ) : (
          <CosmicCard className="cosmic-glow">
            <CardHeader>
              <div className="text-center mb-4">
                <CosmicBadge variant="cosmic-success" className="mb-4">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Revelada
                </CosmicBadge>
                <CardTitle className="text-2xl md:text-3xl cosmic-text-glow">
                  {letter.title || "Mensagem Cósmica Revelada"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
                <CosmicBadge variant="cosmic-outline">
                  Revelada em {new Date().toLocaleDateString("pt-BR")}
                </CosmicBadge>
              </div>

              <CosmicSeparator className="my-6" />

              <CosmicCard className="p-6 mb-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-purple-100 text-lg leading-relaxed whitespace-pre-wrap">
                    {letter.content}
                  </p>
                </div>
              </CosmicCard>

              <CosmicSeparator className="my-6" />

              <div className="text-center">
                <p className="text-purple-400 text-sm mb-4">
                  Esta mensagem transcendeu o espaço-tempo para chegar até você
                  ✨
                </p>
                <Link href="/">
                  <CosmicButton>
                    <Heart className="mr-2 h-4 w-4" />
                    Criar Minha Carta Cósmica
                  </CosmicButton>
                </Link>
              </div>
            </CardContent>
          </CosmicCard>
        )}

        {/* Link de compartilhamento */}
        <CosmicCard className="p-6 mb-8">
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
            <CosmicButton
              variant="cosmic-outline"
              onClick={copyShareLink}
              className="text-purple-300 hover:text-purple-200 ml-4"
              disabled={!origin}
            >
              <Copy className="h-5 w-5" />
            </CosmicButton>
          </div>
        </CosmicCard>
      </div>
    </div>
  );
}
