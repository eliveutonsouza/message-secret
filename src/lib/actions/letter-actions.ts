"use server";
import { auth } from "@/auth";
import { LetterService } from "@/lib/services/letter-service";
import {
  createLetterSchema,
  updateLetterSchema,
  letterFiltersSchema,
} from "@/lib/validations";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function createLetterAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const status = formData.get("status") as "DRAFT" | "ACTIVE" | "ARCHIVED";

    const validatedData = createLetterSchema.parse({
      title: title || undefined,
      content,
      releaseDate,
      status,
    });

    const uniqueLink = nanoid(12);

    const letter = await LetterService.createLetter({
      userId: session.user.id,
      title: validatedData.title,
      content: validatedData.content,
      releaseDate: new Date(validatedData.releaseDate),
      uniqueLink,
      status: validatedData.status,
    });

    revalidatePath("/dashboard");

    // Retorna o ID da carta para ser usado no checkout
    return {
      success: true,
      details: {
        letterId: letter.id,
        uniqueLink: letter.uniqueLink,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Dados inválidos", details: error.errors };
    }
    console.error("Erro ao criar carta:", error);
    return { error: "Erro ao criar carta. Tente novamente." };
  }
}

export async function updateLetterAction(letterId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const letter = await LetterService.getLetterById(letterId);
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const releaseDate = formData.get("releaseDate") as string;

    const validatedData = updateLetterSchema.parse({
      title: title || undefined,
      content: content || undefined,
      releaseDate: releaseDate || undefined,
    });

    const updateData: Record<string, unknown> = {};
    if (validatedData.title !== undefined)
      updateData.title = validatedData.title;
    if (validatedData.content !== undefined)
      updateData.content = validatedData.content;
    if (validatedData.releaseDate !== undefined)
      updateData.releaseDate = new Date(validatedData.releaseDate);

    await LetterService.updateLetter(letterId, updateData);

    revalidatePath("/dashboard");
    revalidatePath(`/edit-letter/${letterId}`);

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Dados inválidos", details: error.errors };
    }
    console.error("Erro ao atualizar carta:", error);
    return { error: "Erro ao atualizar carta. Tente novamente." };
  }
}

export async function toggleFavoriteAction(letterId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const letter = await LetterService.getLetterById(letterId);
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" };
    }

    await LetterService.toggleFavorite(letterId);

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar favorito:", error);
    return { error: "Erro ao atualizar favorito. Tente novamente." };
  }
}

export async function deleteLetterAction(letterId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const letter = await LetterService.getLetterById(letterId);
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" };
    }

    await LetterService.deleteLetter(letterId);

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar carta:", error);
    return { error: "Erro ao deletar carta. Tente novamente." };
  }
}

export async function getFilteredLettersAction(filters: unknown) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const validatedFilters = letterFiltersSchema.parse(filters);
    const letters = await LetterService.getFilteredLetters(
      session.user.id,
      validatedFilters
    );

    return { letters };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Filtros inválidos", details: error.errors };
    }
    console.error("Erro ao buscar cartas:", error);
    return { error: "Erro ao buscar cartas. Tente novamente." };
  }
}

export async function getLetterPreviewAction(letterId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const letter = await LetterService.getLetterById(letterId);
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" };
    }

    // Retorna apenas os dados necessários para pré-visualização
    // sem o conteúdo da carta
    const previewData = {
      id: letter.id,
      title: letter.title,
      releaseDate: letter.releaseDate,
      isFavorite: letter.isFavorite,
      status: letter.status,
      uniqueLink: letter.uniqueLink,
      createdAt: letter.createdAt,
    };

    return { letter: previewData };
  } catch (error) {
    console.error("Erro ao buscar pré-visualização da carta:", error);
    return { error: "Erro ao buscar pré-visualização. Tente novamente." };
  }
}

export async function getLetterForFullPreviewAction(letterId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const letter = await LetterService.getLetterById(letterId);
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" };
    }

    // Verifica se a carta já pode ser visualizada
    const now = new Date();
    const releaseDate =
      typeof letter.releaseDate === "string"
        ? new Date(letter.releaseDate)
        : letter.releaseDate;

    const canBeViewed = now >= releaseDate;

    return {
      letter,
      canBeViewed,
      timeUntilRelease: canBeViewed ? 0 : releaseDate.getTime() - now.getTime(),
    };
  } catch (error) {
    console.error("Erro ao buscar carta completa:", error);
    return { error: "Erro ao buscar carta. Tente novamente." };
  }
}
