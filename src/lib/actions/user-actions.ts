"use server";

import { auth } from "@/auth";
import { UserService } from "@/lib/services/user-service";
import { updateUserSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { updateProfileSchema, UpdateProfileInput } from "@/lib/schemas/user";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";

export async function updateUserAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const validatedData = updateUserSchema.parse({
      name: name || undefined,
      email: email || undefined,
    });

    await UserService.updateUser(session.user.id, validatedData);

    revalidatePath("/dashboard");
    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Dados inválidos", details: error.message };
    }
    return { error: "Erro ao atualizar perfil. Tente novamente." };
  }
}

export async function deleteUserAction() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    await UserService.deleteUser(session.user.id);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Erro ao deletar conta. Tente novamente." };
    }
    return { error: "Erro ao deletar conta. Tente novamente." };
  }
}

export async function updateProfileAction(data: UpdateProfileInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const validatedData = updateProfileSchema.parse(data);

    await UserService.updateUser(session.user.id, {
      name: validatedData.name,
    });

    revalidatePath("/profile");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: "Dados inválidos", details: error.errors };
    }
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Erro ao atualizar perfil. Tente novamente." };
  }
}

export async function getUserSessionsAction() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    const sessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        sessionToken: true,
        expires: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { sessions };
  } catch (error) {
    console.error("Erro ao buscar sessões:", error);
    return { error: "Erro ao buscar sessões. Tente novamente." };
  }
}

export async function deleteSessionAction(sessionToken: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    // Verificar se a sessão pertence ao usuário
    const userSession = await prisma.session.findFirst({
      where: {
        sessionToken,
        userId: session.user.id,
      },
    });

    if (!userSession) {
      return { error: "Sessão não encontrada" };
    }

    await prisma.session.delete({
      where: {
        sessionToken,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar sessão:", error);
    return { error: "Erro ao deletar sessão. Tente novamente." };
  }
}

export async function deleteAllSessionsAction() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Não autorizado" };
    }

    await prisma.session.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar todas as sessões:", error);
    return { error: "Erro ao deletar sessões. Tente novamente." };
  }
}
