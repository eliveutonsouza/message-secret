import { type NextRequest, NextResponse } from "next/server"
import { LetterService } from "@/lib/services/letter-service"

interface RouteParams {
  params: Promise<{ link: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { link } = await params

    const letter = await LetterService.getLetterByUniqueLink(link)

    if (!letter) {
      return NextResponse.json({ error: "Carta não encontrada" }, { status: 404 })
    }

    // Remove informações sensíveis do usuário
    const { user, ...letterData } = letter
    const sanitizedLetter = {
      ...letterData,
      user: {
        id: user.id,
        name: user.name,
      },
    }

    return NextResponse.json(sanitizedLetter)
  } catch (error) {
    console.error("Erro ao buscar carta por link:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
