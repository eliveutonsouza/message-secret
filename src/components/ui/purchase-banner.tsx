"use client";

import { useState } from "react";
import { Rocket, X, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PreviewModal } from "@/components/ui/preview-modal";
import { Letter } from "@prisma/client";

interface PurchaseBannerProps {
  letter: Letter;
  onClose?: () => void;
}

export function PurchaseBanner({ letter, onClose }: PurchaseBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-900/50 via-orange-900/50 to-red-900/50 border-b border-yellow-700/40 px-4 py-3">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5"
            aria-hidden="true"
          >
            <Rocket className="text-black opacity-80" size={16} />
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-yellow-200">
                ✨ Transforme seu rascunho em uma carta cósmica!
              </p>
              <p className="text-yellow-100/80 text-sm">
                Ative sua carta por apenas R$ 5,99 e surpreenda quem você ama
              </p>
            </div>
            <div className="flex gap-2 max-md:flex-wrap">
              <Link href={`/dashboard/edit-letter?id=${letter.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-sm bg-purple-900/50 border-purple-600 text-purple-200 hover:bg-purple-800/50"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              </Link>
              <PreviewModal
                letter={{
                  id: letter.id,
                  title: letter.title || "",
                  releaseDate: letter.releaseDate,
                  isFavorite: letter.isFavorite || false,
                  status: letter.status,
                  uniqueLink: letter.uniqueLink,
                }}
                trigger={
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-sm bg-blue-900/50 border-blue-600 text-blue-200 hover:bg-blue-800/50"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Pré-visualizar
                  </Button>
                }
              />
              <Link href={`/dashboard/payment/${letter.id}`}>
                <Button
                  size="sm"
                  className="text-sm bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-medium"
                >
                  <Rocket className="h-3 w-3 mr-1" />
                  Comprar
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent text-yellow-300 hover:text-yellow-200"
          onClick={handleClose}
          aria-label="Fechar banner"
        >
          <X
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
