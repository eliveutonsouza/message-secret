"use client"

import { CosmicInput, CosmicSubmitButton } from "@/components/ui/cosmic-form"
import { useState } from "react"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string

    if (!email || !email.includes("@")) {
      toast.error("Por favor, insira um email válido")
      return
    }

    // Aqui você integraria com seu serviço de newsletter
    // Por exemplo: Mailchimp, ConvertKit, etc.

    toast.success("Obrigado! Você receberá nossas novidades cósmicas! ✨")
    setEmail("")
  }

  return (
    <form action={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <CosmicInput
        name="email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <CosmicSubmitButton className="px-6 whitespace-nowrap">Inscrever-se</CosmicSubmitButton>
    </form>
  )
}
