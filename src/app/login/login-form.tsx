"use client"

import { CosmicInput, CosmicLabel, CosmicFormField, CosmicSubmitButton } from "@/components/ui/cosmic-form"
import { signInWithEmail } from "@/lib/actions"
import { Mail } from "lucide-react"
import { toast } from "sonner"

interface LoginFormProps {
  callbackUrl?: string
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  async function handleSubmit(formData: FormData) {
    const result = await signInWithEmail(formData)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Link mágico enviado! ✨", {
        description: "Verifique seu email para acessar sua conta cósmica.",
      })
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl || "/dashboard"} />

      <CosmicFormField>
        <CosmicLabel htmlFor="email">Email Cósmico</CosmicLabel>
        <CosmicInput id="email" name="email" type="email" placeholder="seu@email.com" required />
      </CosmicFormField>

      <CosmicSubmitButton loadingText="Enviando...">
        <Mail className="h-4 w-4" />
        Enviar Link Mágico
      </CosmicSubmitButton>
    </form>
  )
}
