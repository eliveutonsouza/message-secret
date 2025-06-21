"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  CosmicDropdownMenuContent,
  CosmicDropdownMenuItem,
} from "@/components/ui/cosmic-dropdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toggleFavoriteAction, deleteLetterAction } from "@/lib/actions";
import {
  Heart,
  Edit,
  ExternalLink,
  MoreVertical,
  Trash2,
  CreditCard,
  Eye,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Letter } from "@prisma/client";

interface LetterCardActionsProps {
  letter: Letter;
}

export function LetterCardActions({ letter }: LetterCardActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleToggleFavorite() {
    const result = await toggleFavoriteAction(letter.id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        letter.isFavorite
          ? "Removido dos favoritos"
          : "Adicionado aos favoritos"
      );
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deleteLetterAction(letter.id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Carta deletada com sucesso");
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao deletar carta");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleFavorite}
          className="text-purple-300 hover:text-purple-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`h-4 w-4 ${letter.isFavorite ? "fill-current text-red-400" : ""}`}
          />
        </Button>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:text-purple-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <CosmicDropdownMenuContent align="end">
            {letter.status === "DRAFT" ? (
              <>
                <CosmicDropdownMenuItem asChild>
                  <Link href={`/dashboard/edit-letter?id=${letter.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </CosmicDropdownMenuItem>
                <CosmicDropdownMenuItem asChild>
                  <Link href={`/payment/${letter.id}`}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Comprar Carta
                  </Link>
                </CosmicDropdownMenuItem>
                <CosmicDropdownMenuItem asChild>
                  <Link href={`/dashboard/preview-letter?id=${letter.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Pré-visualizar
                  </Link>
                </CosmicDropdownMenuItem>
              </>
            ) : (
              <CosmicDropdownMenuItem asChild>
                <Link href={`/letter/${letter.uniqueLink}`} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visualizar
                </Link>
              </CosmicDropdownMenuItem>
            )}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <CosmicDropdownMenuItem
                  className="text-red-400 focus:text-red-300"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </CosmicDropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <DialogTitle className="text-lg font-semibold">
                      Confirmar exclusão
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-sm text-gray-600">
                    Tem certeza que deseja deletar a carta &quot;
                    {letter.title || "Carta sem título"}&quot;?
                    <br />
                    <span className="font-medium text-red-600">
                      Esta ação não pode ser desfeita.
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                    disabled={isDeleting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deletando..." : "Deletar Carta"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CosmicDropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
