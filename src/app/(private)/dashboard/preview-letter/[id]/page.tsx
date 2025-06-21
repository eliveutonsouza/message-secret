import { notFound } from "next/navigation";
import { LetterService } from "@/lib/services/letter-service";
import { auth } from "@/auth";
import { PreviewLetterClient } from "../preview-letter-client";

interface PreviewLetterPageProps {
  params: { id: string };
  searchParams: { session_id?: string };
}

export default async function PreviewLetterPage({
  params,
  searchParams,
}: PreviewLetterPageProps) {
  const session = await auth();
  if (!session?.user?.id) return notFound();

  const letterId = params.id;
  if (!letterId) return notFound();

  const letter = await LetterService.getLetterById(letterId);
  if (!letter || letter.userId !== session.user.id) return notFound();

  // Verifica se a carta já pode ser visualizada
  const now = new Date();
  const releaseDate =
    typeof letter.releaseDate === "string"
      ? new Date(letter.releaseDate)
      : letter.releaseDate;

  const canBeViewed = now >= releaseDate;
  const timeUntilRelease = canBeViewed
    ? 0
    : releaseDate.getTime() - now.getTime();

  // Retorna apenas os dados necessários para pré-visualização
  const previewData = {
    id: letter.id,
    title: letter.title,
    releaseDate: letter.releaseDate,
    isFavorite: letter.isFavorite,
    status: letter.status,
    uniqueLink: letter.uniqueLink,
    createdAt: letter.createdAt,
  };

  return (
    <PreviewLetterClient
      letter={previewData}
      canBeViewed={canBeViewed}
      timeUntilRelease={timeUntilRelease}
      sessionId={searchParams.session_id}
    />
  );
}
