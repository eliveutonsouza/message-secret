"use client";

import { useState, useEffect } from "react";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { CosmicProgress } from "@/components/ui/cosmic-progress";
import { CosmicSeparator } from "@/components/ui/cosmic-separator";
import { Clock, Heart, Sparkles, Lock, Calendar } from "lucide-react";
import Link from "next/link";
import type { Letter } from "@prisma/client";
import { PaymentStatus } from "@prisma/client";

interface LetterViewProps {
  letter: Letter;
}

export function LetterView({ letter }: LetterViewProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const releaseDate = new Date(letter.releaseDate);
    const now = new Date();

    if (now >= releaseDate) {
      setIsRevealed(true);
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const difference = releaseDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsRevealed(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, total: difference });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [letter.releaseDate]);

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
    new Date(letter.releaseDate).getTime() -
    new Date(letter.createdAt).getTime();
  const elapsed = totalDuration - (timeLeft?.total || 0);
  const progressPercentage =
    totalDuration > 0 ? (elapsed / totalDuration) * 100 : 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-2xl">
        {!isRevealed ? (
          <CosmicCard className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CosmicBadge variant="cosmic-outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
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

              {timeLeft && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    <CosmicCard className="p-4">
                      <div className="text-2xl font-bold text-purple-200">
                        {timeLeft.days}
                      </div>
                      <div className="text-sm text-purple-400">Dias</div>
                    </CosmicCard>
                    <CosmicCard className="p-4">
                      <div className="text-2xl font-bold text-purple-200">
                        {timeLeft.hours}
                      </div>
                      <div className="text-sm text-purple-400">Horas</div>
                    </CosmicCard>
                    <CosmicCard className="p-4">
                      <div className="text-2xl font-bold text-purple-200">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-sm text-purple-400">Min</div>
                    </CosmicCard>
                    <CosmicCard className="p-4">
                      <div className="text-2xl font-bold text-purple-200">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-sm text-purple-400">Seg</div>
                    </CosmicCard>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-purple-400 mb-2">
                      <span>Progresso da jornada temporal</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <CosmicProgress
                      value={progressPercentage}
                      className="h-3"
                    />
                  </div>
                </>
              )}

              <CosmicCard className="p-4 mb-6">
                <p className="text-purple-400 text-sm mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Data de liberação:
                </p>
                <p className="text-purple-200 font-medium">
                  {new Date(letter.releaseDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CosmicCard>

              <CosmicCard className="p-4">
                <p className="text-purple-300 italic text-sm">
                  "O amor não conhece distância nem tempo. Ele simplesmente é,
                  como as estrelas que brilham há milhões de anos."
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
      </div>
    </div>
  );
}
