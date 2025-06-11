import { type NextRequest, NextResponse } from "next/server";
import { LetterService } from "@/lib/services/letter-service";
import { createLetterSchema } from "@/lib/validations/letter";
import { nanoid } from "nanoid";
import { auth } from "@/auth";
import { ZodError } from "zod";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const letters = await LetterService.getLettersByUserId(session.user.id);
    return NextResponse.json(letters);
  } catch (error) {
    console.error("Erro ao buscar cartas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createLetterSchema.parse(body);

    const uniqueLink = nanoid(12);

    const letter = await LetterService.createLetter({
      userId: session.user.id,
      title: validatedData.title,
      content: validatedData.content,
      releaseDate: new Date(validatedData.releaseDate),
      uniqueLink,
    });

    return NextResponse.json(letter, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar carta:", error);

    if (error instanceof ZodError) {
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
