import { CosmicCard, CardContent } from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { LetterCard } from "./letter-card";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import type { Letter } from "@prisma/client";

interface LettersGridProps {
  letters: Letter[];
}

export function LettersGrid({ letters }: LettersGridProps) {
  if (letters.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {letters.map((letter) => (
        <LetterCard key={letter.id} letter={letter} />
      ))}
    </div>
  );
}
