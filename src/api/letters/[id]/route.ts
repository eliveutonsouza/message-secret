import { type NextRequest, NextResponse } from "next/server";
import { LetterService } from "@/lib/services/letter-service";
import { updateLetterSchema } from "@/lib/validations/letter";
import { auth } from "@/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const letter = await LetterService.getLetterById(id);

    if (!letter) {
      return NextResponse.json(
        { error: "Carta não encontrada" },
        { status: 404 }
      );
    }

    if (letter.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    return NextResponse.json(letter);
  } catch (error) {
    console.error("Erro ao buscar carta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const letter = await LetterService.getLetterById(id);

    if (!letter) {
      return NextResponse.json(
        { error: "Carta não encontrada" },
        { status: 404 }
      );
    }

    if (letter.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateLetterSchema.parse(body);

    const updateData: any = {};

    if (validatedData.title !== undefined)
      updateData.title = validatedData.title;
    if (validatedData.content !== undefined)
      updateData.content = validatedData.content;
    if (validatedData.releaseDate !== undefined)
      updateData.releaseDate = new Date(validatedData.releaseDate);
    if (validatedData.isFavorite !== undefined)
      updateData.isFavorite = validatedData.isFavorite;

    const updatedLetter = await LetterService.updateLetter(id, updateData);
    return NextResponse.json(updatedLetter);
  } catch (error: any) {
    console.error("Erro ao atualizar carta:", error);

    if (error.errors) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const letter = await LetterService.getLetterById(id);

    if (!letter) {
      return NextResponse.json(
        { error: "Carta não encontrada" },
        { status: 404 }
      );
    }

    if (letter.userId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    await LetterService.deleteLetter(id);
    return NextResponse.json({ message: "Carta deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar carta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
