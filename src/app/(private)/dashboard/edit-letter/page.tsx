import { notFound } from "next/navigation";

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
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Editar Carta Cósmica
      </h1>
      <EditLetterForm letter={safeLetter} />
    </div>
  );
}
