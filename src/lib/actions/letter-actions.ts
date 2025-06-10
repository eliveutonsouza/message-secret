"use server"

import { auth } from "@/auth"
import { LetterService } from "@/lib/services/letter-service"
import { createLetterSchema, updateLetterSchema, letterFiltersSchema } from "@/lib/validations"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createLetterAction(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const releaseDate = formData.get("releaseDate") as string

    const validatedData = createLetterSchema.parse({
      title: title || undefined,
      content,
      releaseDate,
    })

    const uniqueLink = nanoid(12)

    const letter = await LetterService.createLetter({
      userId: session.user.id,
      title: validatedData.title,
      content: validatedData.content,
      releaseDate: new Date(validatedData.releaseDate),
      uniqueLink,
    })

    revalidatePath("/dashboard")
    redirect(`/payment/${letter.id}`)
  } catch (error: any) {
    if (error.errors) {
      return { error: "Dados inválidos", details: error.errors }
    }
    return { error: "Erro ao criar carta. Tente novamente." }
  }
}

export async function updateLetterAction(letterId: string, formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const letter = await LetterService.getLetterById(letterId)
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const releaseDate = formData.get("releaseDate") as string

    const validatedData = updateLetterSchema.parse({
      title: title || undefined,
      content: content || undefined,
      releaseDate: releaseDate || undefined,
    })

    const updateData: any = {}
    if (validatedData.title !== undefined) updateData.title = validatedData.title
    if (validatedData.content !== undefined) updateData.content = validatedData.content
    if (validatedData.releaseDate !== undefined) updateData.releaseDate = new Date(validatedData.releaseDate)

    await LetterService.updateLetter(letterId, updateData)

    revalidatePath("/dashboard")
    revalidatePath(`/edit-letter/${letterId}`)

    return { success: true }
  } catch (error: any) {
    if (error.errors) {
      return { error: "Dados inválidos", details: error.errors }
    }
    return { error: "Erro ao atualizar carta. Tente novamente." }
  }
}

export async function toggleFavoriteAction(letterId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const letter = await LetterService.getLetterById(letterId)
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" }
    }

    await LetterService.toggleFavorite(letterId)

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Erro ao atualizar favorito. Tente novamente." }
  }
}

export async function deleteLetterAction(letterId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const letter = await LetterService.getLetterById(letterId)
    if (!letter || letter.userId !== session.user.id) {
      return { error: "Carta não encontrada ou acesso negado" }
    }

    await LetterService.deleteLetter(letterId)

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { error: "Erro ao deletar carta. Tente novamente." }
  }
}

export async function getFilteredLettersAction(filters: any) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const validatedFilters = letterFiltersSchema.parse(filters)
    const letters = await LetterService.getFilteredLetters(session.user.id, validatedFilters)

    return { letters }
  } catch (error) {
    return { error: "Erro ao buscar cartas. Tente novamente." }
  }
}
