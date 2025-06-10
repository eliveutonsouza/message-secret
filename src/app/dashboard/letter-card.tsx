"use client"

import { CosmicCard, CardContent, CardHeader, CardTitle } from "@/components/ui/cosmic-card"
import { CosmicBadge } from "@/components/ui/cosmic-badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  CosmicDropdownMenuContent,
  CosmicDropdownMenuItem,
} from "@/components/ui/cosmic-dropdown"
import { toggleFavoriteAction, deleteLetterAction } from "@/lib/actions"
import { Heart, Clock, Edit, ExternalLink, MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"
import type { Letter } from "@prisma/client"
import { toast } from "sonner"

interface LetterCardProps {
  letter: Letter
}

export function LetterCard({ letter }: LetterCardProps) {
  async function handleToggleFavorite() {
    const result = await toggleFavoriteAction(letter.id)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success(letter.isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos")
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja deletar esta carta?")) return

    const result = await deleteLetterAction(letter.id)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Carta deletada com sucesso")
    }
  }

  const getStatusBadge = (letter: Letter) => {
    const now = new Date()
    const releaseDate = new Date(letter.releaseDate)

    if (letter.paymentStatus !== PaymentStatus.PAID) {
      return <CosmicBadge variant="cosmic-destructive">Pagamento Pendente</CosmicBadge>
    }

    if (releaseDate > now) {
      return <CosmicBadge variant="cosmic-outline">Aguardando Liberação</CosmicBadge>
    }

    return <CosmicBadge variant="cosmic-success">Liberada</CosmicBadge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <CosmicCard className="relative group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-purple-200 text-lg line-clamp-1">{letter.title || "Carta sem título"}</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="text-purple-300 hover:text-purple-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className={`h-4 w-4 ${letter.isFavorite ? "fill-current text-red-400" : ""}`} />
            </Button>

            <DropdownMenu>
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
                <CosmicDropdownMenuItem asChild>
                  <Link href={`/edit-letter/${letter.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </CosmicDropdownMenuItem>
                <CosmicDropdownMenuItem asChild>
                  <Link href={`/letter/${letter.uniqueLink}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visualizar
                  </Link>
                </CosmicDropdownMenuItem>
                <CosmicDropdownMenuItem onClick={handleDelete} className="text-red-400 focus:text-red-300">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </CosmicDropdownMenuItem>
              </CosmicDropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {getStatusBadge(letter)}
          {letter.isFavorite && (
            <CosmicBadge variant="cosmic-outline" className="border-red-400 text-red-400">
              ⭐ Favorita
            </CosmicBadge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-purple-300 text-sm line-clamp-3">{letter.content}</p>
          <div className="flex items-center text-purple-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            Libera em: {formatDate(letter.releaseDate)}
          </div>
        </div>
      </CardContent>
    </CosmicCard>
  )
}
