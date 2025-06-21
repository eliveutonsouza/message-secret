import { NextRequest, NextResponse } from "next/server";
import { activateLetterAction } from "@/lib/actions/letter-actions";

export async function POST(req: NextRequest) {
  try {
    const { letterId } = await req.json();

    if (!letterId) {
      return NextResponse.json(
        { error: "letterId é obrigatório" },
        { status: 400 }
      );
    }

    console.log("Testando ativação da carta:", letterId);
    const result = await activateLetterAction(letterId);
    console.log("Resultado:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro no teste:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
