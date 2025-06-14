import { useState } from "react";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicBadge } from "@/components/ui/cosmic-badge";
import { CosmicAvatar } from "@/components/ui/cosmic-avatar";
import { CosmicSkeleton } from "@/components/ui/cosmic-skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  CosmicDropdownMenuContent,
  CosmicDropdownMenuItem,
  CosmicDropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/cosmic-dropdown";
import {
  Plus,
  Heart,
  Clock,
  Star,
  Edit,
  ExternalLink,
  LogOut,
  MoreVertical,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { Letter } from "@prisma/client";
import { signOut } from "next-auth/react";

interface DashboardContentProps {
  letters: Letter[];
  user: User;
}

export function DashboardContent({
  letters: initialLetters,
  user,
}: DashboardContentProps) {
  const [letters, setLetters] = useState(initialLetters);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleFavorite = async (letterId: string, currentFavorite: boolean) => {
    try {
      const response = await fetch(`/api/letters/${letterId}/favorite`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar favorito");
      }

      const updatedLetter = await response.json();

      setLetters(
        letters.map((letter) =>
          letter.id === letterId ? updatedLetter : letter
        )
      );

      toast({
        title: currentFavorite
          ? "Removido dos favoritos"
          : "Adicionado aos favoritos",
        description: "Carta atualizada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a carta.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (letter: Letter) => {
    const now = new Date();
    const releaseDate = new Date(letter.releaseDate);

    if (letter.paymentStatus !== PaymentStatus.PAID) {
      return (
        <CosmicBadge variant="cosmic-destructive">
          Pagamento Pendente
        </CosmicBadge>
      );
    }

    if (releaseDate > now) {
      return (
        <CosmicBadge variant="cosmic-outline">Aguardando Liberação</CosmicBadge>
      );
    }

    return <CosmicBadge variant="cosmic-success">Liberada</CosmicBadge>;
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

  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <CosmicSkeleton className="h-8 w-64" />
              <CosmicSkeleton className="h-4 w-48" />
            </div>
            <CosmicSkeleton className="h-10 w-20" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CosmicCard key={i}>
                <CardHeader>
                  <CosmicSkeleton className="h-6 w-3/4" />
                  <CosmicSkeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <CosmicSkeleton className="h-16 w-full mb-4" />
                  <CosmicSkeleton className="h-4 w-full" />
                </CardContent>
              </CosmicCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold cosmic-text-glow">
              Suas Cartas Cósmicas
            </h1>
            <p className="text-purple-200 mt-2">
              Bem-vindo de volta, {user.name || user.email}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-purple-200"
              >
                <CosmicAvatar
                  src={user.image || undefined}
                  fallback={getUserInitials(user.name, user.email)}
                  className="h-8 w-8 mr-2"
                />
                <span className="hidden md:inline">
                  {user.name || user.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <CosmicDropdownMenuContent align="end">
              <CosmicDropdownMenuLabel>Minha Conta</CosmicDropdownMenuLabel>
              <DropdownMenuSeparator />
              <CosmicDropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </CosmicDropdownMenuItem>
              <DropdownMenuSeparator />
              <CosmicDropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </CosmicDropdownMenuItem>
            </CosmicDropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Create New Letter Button */}
        <div className="mb-8">
          <Link href="/create-letter">
            <CosmicButton size="lg" className="text-lg px-6 py-3">
              <Plus className="mr-2 h-5 w-5" />
              Criar Nova Carta Cósmica
            </CosmicButton>
          </Link>
        </div>

        {/* Letters Grid */}
        {letters.length === 0 ? (
          <CosmicCard className="text-center py-12">
            <CardContent>
              <Star className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-200 mb-2">
                Nenhuma carta criada ainda
              </h3>
              <p className="text-purple-300 mb-6">
                Que tal começar sua jornada cósmica criando sua primeira carta?
              </p>
              <Link href="/create-letter">
                <CosmicButton>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeira Carta
                </CosmicButton>
              </Link>
            </CardContent>
          </CosmicCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {letters.map((letter) => (
              <CosmicCard key={letter.id} className="relative group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-purple-200 text-lg line-clamp-1">
                      {letter.title || "Carta sem título"}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toggleFavorite(letter.id, letter.isFavorite)
                        }
                        className="text-purple-300 hover:text-purple-200 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart
                          className={`h-4 w-4 ${letter.isFavorite ? "fill-current text-red-400" : ""}`}
                        />
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
                            <Link
                              href={`/letter/${letter.uniqueLink}`}
                              target="_blank"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visualizar
                            </Link>
                          </CosmicDropdownMenuItem>
                        </CosmicDropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
                      Libera em: {formatDate(letter.releaseDate)}
                    </div>
                  </div>
                </CardContent>
              </CosmicCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
