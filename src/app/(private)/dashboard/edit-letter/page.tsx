import { notFound } from "next/navigation";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { LetterService } from "@/lib/services/letter-service";
import EditLetterForm from "./components/edit-letter-form";
import { auth } from "@/auth";

interface EditLetterPageProps {
  searchParams: { id?: string };
}

export default async function EditLetterPage({
  searchParams,
}: EditLetterPageProps) {
  const session = await auth();
  if (!session) return notFound();

  const letterId = searchParams.id;
  if (!letterId) return notFound();

  const letter = await LetterService.getLetterById(letterId);
  if (!letter) return notFound();

  // Garante que só os campos esperados são passados para o formulário
  const safeLetter = {
    id: letter.id,
    title: letter.title ?? "",
    content: letter.content ?? "",
    releaseDate: letter.releaseDate
      ? typeof letter.releaseDate === "string"
        ? letter.releaseDate
        : letter.releaseDate.toISOString()
      : "",
    status: letter.status ? String(letter.status) : "",
    accessPassword: letter.accessPassword ?? null,
    maxViews: letter.maxViews ?? null,
    expiresAt: letter.expiresAt ?? null,
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <CosmicButton variant="cosmic-ghost">
                <ArrowLeft className="h-4 w-4" />
              </CosmicButton>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold cosmic-text-glow">
                Editar Carta Cósmica
              </h1>
              <p className="text-purple-200">
                Modifique sua mensagem que transcenderá o tempo
              </p>
            </div>
          </div>

          <EditLetterForm letter={safeLetter} />
        </div>
      </div>
    </div>
  );
}
