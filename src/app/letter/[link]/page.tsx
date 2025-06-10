import { notFound } from "next/navigation"
import { LetterView } from "./letter-view"
import { LetterService } from "@/lib/services/letter-service"

interface LetterPageProps {
  params: Promise<{ link: string }>
}

export default async function LetterPage({ params }: LetterPageProps) {
  const { link } = await params

  const letter = await LetterService.getLetterByUniqueLink(link)

  if (!letter) {
    notFound()
  }

  return <LetterView letter={letter} />
}
