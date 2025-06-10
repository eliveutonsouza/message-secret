import { type NextRequest, NextResponse } from "next/server"
import { LetterService } from "@/lib/services/letter-service"
import { auth } from "@/auth"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const letter = await LetterService.getLetterById(id)

    if (!letter) {
      return NextResponse.json({ error: "Carta não encontrada" }, { status: 404 })
    }

    if (letter.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    const updatedLetter = await LetterService.toggleFavorite(id)
    return NextResponse.json(updatedLetter)
  } catch (error) {
    console.error("Erro ao favoritar carta:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
