"use server"

import { auth } from "@/auth"
import { UserService } from "@/lib/services/user-service"
import { updateUserSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function updateUserAction(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string

    const validatedData = updateUserSchema.parse({
      name: name || undefined,
      email: email || undefined,
    })

    await UserService.updateUser(session.user.id, validatedData)

    revalidatePath("/dashboard")
    revalidatePath("/profile")

    return { success: true }
  } catch (error: any) {
    if (error.errors) {
      return { error: "Dados inválidos", details: error.errors }
    }
    return { error: "Erro ao atualizar perfil. Tente novamente." }
  }
}

export async function deleteUserAction() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Não autorizado" }
    }

    await UserService.deleteUser(session.user.id)

    return { success: true }
  } catch (error) {
    return { error: "Erro ao deletar conta. Tente novamente." }
  }
}
