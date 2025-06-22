"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Heart, Copy, CreditCard, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import Link from "next/link";

interface LargePreviewModalProps {
  letter: {
    id: string;
    title?: string | null;
    releaseDate: string | Date;
    isFavorite?: boolean;
    status: string;
    uniqueLink: string;
  };
  trigger?: React.ReactNode;
}

export function LargePreviewModal({ letter, trigger }: LargePreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canBeViewed, setCanBeViewed] = useState(false);
  const [origin, setOrigin] = useState("");

  // Memorizar a data de liberação para evitar re-criação a cada render
  const releaseDate = useMemo(
    () =>
      typeof letter.releaseDate === "string"
        ? new Date(letter.releaseDate)
        : letter.releaseDate,
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

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Abrindo modal grande..."); // Debug
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log("Fechando modal grande..."); // Debug
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no conteúdo feche o modal
  };

  // Se não estiver aberto, renderiza apenas o trigger
  if (!isOpen) {
    return (
      <div onClick={handleOpen} className="cursor-pointer w-full">
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-300 hover:text-purple-200 w-full"
          >
            <Eye className="mr-2 h-4 w-4" />
            Pré-visualizar Grande
          </Button>
        )}
      </div>
    );
  }

  // Se estiver aberto, renderiza o modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      <div
        className="relative z-50 bg-gradient-to-br from-purple-950 via-purple-900 to-blue-950 border border-purple-800 rounded-lg shadow-xl p-6 max-w-6xl w-full mx-4 max-h-[95vh] overflow-y-auto"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">
            Pré-visualização Completa da Carta
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-purple-300 hover:text-purple-200 flex-shrink-0"
          >
            ×
          </Button>
        </div>

        {/* Cabeçalho da carta */}
        <div className="text-center space-y-6 mb-10">
          {letter.title && (
            <h3 className="text-2xl sm:text-3xl font-semibold text-white break-words">
              {letter.title}
            </h3>
          )}
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-purple-200 text-base sm:text-lg flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="whitespace-nowrap">
                Liberação: {formattedDate}
              </span>
            </div>
            {letter.isFavorite && (
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-red-400 text-red-400" />
                <span>Favorita</span>
              </div>
            )}
          </div>
        </div>

        {/* Countdown */}
        {!canBeViewed && (
          <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-blue-900/50 rounded-xl p-8 sm:p-10 border border-purple-700/50 mb-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 text-purple-200 mb-6">
                <Clock className="h-8 w-8 sm:h-10 sm:w-10" />
                <span className="font-medium text-xl sm:text-2xl">
                  Liberação em:
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {formatTimeLeft(timeLeft)}
              </div>
              <p className="text-purple-300 text-lg sm:text-xl">
                A carta será liberada automaticamente na data e horário
                especificados
              </p>
            </div>
          </div>
        )}

        {/* Skeleton do conteúdo */}
        <div className="bg-gradient-to-r from-purple-900/50 via-purple-800/50 to-blue-900/50 rounded-xl p-8 sm:p-10 border border-purple-700/50 shadow-xl mb-10">
          <div className="space-y-6 sm:space-y-8">
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-3/4"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-5/6"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-2/3"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-4/5"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-3/5"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-7/8"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-1/2"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-4/5"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-3/4"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-5/6"></div>
            <div className="h-6 sm:h-8 bg-purple-700/50 rounded animate-pulse w-2/3"></div>
          </div>
          <div className="text-center text-purple-300 text-lg sm:text-xl mt-10">
            ✨ Conteúdo oculto até a data de liberação ✨
          </div>
        </div>

        {/* Link de compartilhamento */}
        <div className="bg-gradient-to-r from-purple-900/30 via-purple-800/30 to-blue-900/30 rounded-xl p-6 sm:p-8 border border-purple-700/30 mb-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-purple-200 text-base sm:text-lg font-medium mb-3">
                Link de compartilhamento:
              </p>
              <p className="text-purple-300 text-sm sm:text-base break-all">
                {origin
                  ? `${origin}/letter/${letter.uniqueLink}`
                  : "Carregando..."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyShareLink}
              className="text-purple-300 hover:text-purple-200 flex-shrink-0"
              disabled={!origin}
            >
              <Copy className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {letter.status === "DRAFT" && (
            <Link href={`/payment/${letter.id}`} className="w-full block">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg sm:text-xl h-14 sm:h-16">
                <CreditCard className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Comprar Carta
              </Button>
            </Link>
          )}

          {letter.status === "ACTIVE" && canBeViewed && (
            <Link
              href={`/letter/${letter.uniqueLink}`}
              target="_blank"
              className="w-full block"
            >
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg sm:text-xl h-14 sm:h-16">
                <Eye className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Visualizar Carta
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            onClick={handleClose}
            className="w-full border-purple-600 text-purple-300 hover:bg-purple-600/10 text-lg sm:text-xl h-14 sm:h-16"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
