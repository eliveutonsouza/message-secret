"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Heart,
  Clock,
  Sparkles,
  Lock,
  Star,
  Gift,
} from "lucide-react";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { CosmicProgress } from "@/components/ui/cosmic-progress";
import { CosmicSeparator } from "@/components/ui/cosmic-separator";
import type { Letter } from "@prisma/client";

interface WaitingScreenProps {
  letter: Letter;
}

export function WaitingScreen({ letter }: WaitingScreenProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Memorizar a data de liberação para evitar re-criação a cada render
  const releaseDate = useMemo(
    () => new Date(letter.releaseDate),
    [letter.releaseDate]
  );

  const formattedDate = useMemo(
    () =>
      format(releaseDate, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: ptBR,
      }),
    [releaseDate]
  );

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const releaseTime = releaseDate.getTime();
      const difference = releaseTime - now;

      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  // Memorizar os cálculos de progresso para evitar re-cálculos desnecessários
  const { progressPercentage } = useMemo(() => {
    const total = releaseDate.getTime() - new Date(letter.createdAt).getTime();
    const elapsed = total - timeLeft;
    const progress = total > 0 ? (elapsed / total) * 100 : 100;

    return {
      progressPercentage: progress,
    };
  }, [releaseDate, letter.createdAt, timeLeft]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      <div className="w-full max-w-4xl">
        {/* Cabeçalho da carta */}
        <div className="text-center space-y-6 mb-10">
          {letter.title && (
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl animate-pulse">
                {letter.title}
              </h1>
              <div className="flex justify-center">
                <CosmicBadge
                  variant="cosmic-outline"
                  className="text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Carta Especial
                </CosmicBadge>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center gap-6 text-pink-200 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Liberação: {formattedDate}</span>
            </div>
            {letter.isFavorite && (
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-pink-400 text-pink-400 animate-pulse" />
                <span>Favorita</span>
              </div>
            )}
          </div>
        </div>

        {/* Countdown Principal */}
        <CosmicCard className="text-center mb-8 bg-gradient-to-br from-purple-800/50 to-pink-800/50 border-pink-500/30">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CosmicBadge
                variant="cosmic-outline"
                className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-0"
              >
                <Gift className="h-3 w-3 mr-1" />
                Momento Especial
              </CosmicBadge>
            </div>
            <CardTitle className="text-2xl md:text-3xl cosmic-text-glow text-white">
              {letter.title || "Carta Misteriosa"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="relative mb-6">
                <Clock className="h-20 w-20 text-pink-400 mx-auto animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-pink-200 mb-4">
                ✨ Esta mensagem ainda está viajando pelo espaço-tempo... ✨
              </h2>
              <p className="text-pink-300 mb-6 text-lg">
                Ela será revelada em:
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <CosmicCard className="p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-pink-400/50">
                <div className="text-3xl font-bold text-white">
                  {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-pink-200">Dias</div>
              </CosmicCard>
              <CosmicCard className="p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-pink-400/50">
                <div className="text-3xl font-bold text-white">
                  {Math.floor(
                    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  )}
                </div>
                <div className="text-sm text-pink-200">Horas</div>
              </CosmicCard>
              <CosmicCard className="p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-pink-400/50">
                <div className="text-3xl font-bold text-white">
                  {Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))}
                </div>
                <div className="text-sm text-pink-200">Min</div>
              </CosmicCard>
              <CosmicCard className="p-4 bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-pink-400/50">
                <div className="text-3xl font-bold text-white">
                  {Math.floor((timeLeft % (1000 * 60)) / 1000)}
                </div>
                <div className="text-sm text-pink-200">Seg</div>
              </CosmicCard>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-pink-300 mb-2">
                <span>✨ Progresso da jornada temporal ✨</span>
                <span>{progressPercentage.toFixed(1)}%</span>
              </div>
              <CosmicProgress value={progressPercentage} className="h-3" />
            </div>

            <CosmicCard className="p-6 mb-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-yellow-400/30">
              <p className="text-yellow-200 text-sm mb-2 font-medium">
                <Sparkles className="h-4 w-4 inline mr-2" />
                Esta carta foi criada com muito amor e carinho especialmente
                para você!
              </p>
              <p className="text-yellow-100 text-xs">
                🌟 Aguarde pacientemente - a magia está acontecendo! 🌟
              </p>
            </CosmicCard>

            <CosmicSeparator className="my-6" />

            <div className="text-center">
              <p className="text-pink-200 text-sm mb-4">
                💫 Este é um momento único e especial para você! 💫
              </p>
              <div className="flex items-center justify-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="text-pink-300 text-xs">
                  Prepare-se para uma surpresa incrível!
                </span>
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </CosmicCard>

        {/* Informações adicionais */}
        <div className="grid md:grid-cols-2 gap-6">
          <CosmicCard className="p-6 bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-pink-400/30">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-pink-200">
                Segurança Especial
              </h3>
            </div>
            <p className="text-pink-300 text-sm">
              Esta carta está protegida e foi criada especialmente para você. É
              um momento único e pessoal.
            </p>
          </CosmicCard>

          <CosmicCard className="p-6 bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-pink-400/30">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-6 w-6 text-pink-400" />
              <h3 className="text-lg font-semibold text-pink-200">
                Experiência Única
              </h3>
            </div>
            <p className="text-pink-300 text-sm">
              Cada carta é única e especial. A espera faz parte da magia desta
              experiência incrível criada especialmente para você.
            </p>
          </CosmicCard>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-pink-300 text-xs">
            ✨ Criado com tecnologia cósmica e muito amor ✨
          </p>
        </div>
      </div>
    </div>
  );
}
