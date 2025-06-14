"use server";

import { signIn, signOut } from "@/auth";
import { magicLinkSchema } from "@/lib/schemas";
import { sendMagicLinkEmail } from "@/lib/actions/email";
import { AuthError } from "next-auth";

export async function signInWithEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const callbackUrl = formData.get("callbackUrl") as string;

    const validatedData = magicLinkSchema.parse({ email, callbackUrl });

    // Enviar magic link via Resend
    const magicLinkUrl = await generateMagicLink(
      validatedData.email,
      validatedData.callbackUrl
    );

    await sendMagicLinkEmail({
      email: validatedData.email,
      url: magicLinkUrl,
      host: process.env.NEXTAUTH_URL || "localhost:3000",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "EmailSignInError":
          return { error: "Erro ao enviar email. Tente novamente." };
        default:
          return { error: "Erro na autenticação. Tente novamente." };
      }
    }
    return { error: "Erro inesperado. Tente novamente." };
  }
}

export async function signInWithGoogle(callbackUrl?: string) {
  await signIn("google", {
    redirectTo: callbackUrl || "/dashboard",
  });
  // Não retorna nada, pois o NextAuth faz o redirecionamento
}

export async function signOutAction() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Erro ao fazer logout. Tente novamente." };
    }
    return { error: "Erro ao fazer logout. Tente novamente." };
  }
}

async function generateMagicLink(
  email: string,
  callbackUrl?: string
): Promise<string> {
  // Gerar token único para o magic link
  const token = crypto.randomUUID();

  // Salvar token no banco (implementar conforme necessário)
  // await saveMagicLinkToken(email, token)

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const params = new URLSearchParams({
    token,
    email,
    ...(callbackUrl && { callbackUrl }),
  });

  return `${baseUrl}/auth/verify?${params.toString()}`;
}
