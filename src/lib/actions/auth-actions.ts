"use server";

import { signIn, signOut } from "@/auth";
import { magicLinkSchema } from "@/lib/validations";
import { AuthError } from "next-auth";

export async function signInWithEmail(formData: FormData) {
  console.log(formData);
  try {
    const email = formData.get("email") as string;
    const callbackUrl = formData.get("callbackUrl") as string;

    const validatedData = magicLinkSchema.parse({ email, callbackUrl });

    await signIn("resend", {
      email: validatedData.email,
      redirectTo: validatedData.callbackUrl || "/dashboard",
    });
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
  try {
    await signIn("google", {
      redirectTo: callbackUrl || "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Erro na autenticação com Google. Tente novamente." };
    }
    return { error: "Erro inesperado. Tente novamente." };
  }
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
