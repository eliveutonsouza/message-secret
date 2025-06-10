"use client"

import { CosmicCard, CardContent, CardHeader, CardTitle } from "@/components/ui/cosmic-card"
import {
  CosmicInput,
  CosmicLabel,
  CosmicFormField,
  CosmicTextarea,
  CosmicSubmitButton,
  CosmicFormDescription,
} from "@/components/ui/cosmic-form"
import { sendContactFormEmail } from "@/lib/actions/email"
import { contactFormSchema } from "@/lib/schemas"
import { useState } from "react"
import { toast } from "sonner"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      }

      const validatedData = contactFormSchema.parse(data)
      const result = await sendContactFormEmail(validatedData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Mensagem enviada com sucesso! 🚀")
        setIsSubmitted(true)
      }
    } catch (error: any) {
      if (error.errors) {
        toast.error("Por favor, verifique os dados informados")
      } else {
        toast.error("Erro ao enviar mensagem. Tente novamente.")
      }
    }
  }

  if (isSubmitted) {
    return (
      <CosmicCard>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-purple-200 mb-2">Mensagem Enviada!</h3>
          <p className="text-purple-300">Obrigado pelo contato! Responderemos em breve através do espaço-tempo.</p>
        </CardContent>
      </CosmicCard>
    )
  }

  return (
    <CosmicCard>
      <CardHeader>
        <CardTitle className="text-purple-200">Entre em Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <CosmicFormField>
              <CosmicLabel htmlFor="name">Nome *</CosmicLabel>
              <CosmicInput id="name" name="name" placeholder="Seu nome" required />
            </CosmicFormField>

            <CosmicFormField>
              <CosmicLabel htmlFor="email">Email *</CosmicLabel>
              <CosmicInput id="email" name="email" type="email" placeholder="seu@email.com" required />
            </CosmicFormField>
          </div>

          <CosmicFormField>
            <CosmicLabel htmlFor="subject">Assunto *</CosmicLabel>
            <CosmicInput id="subject" name="subject" placeholder="Como podemos ajudar?" required />
          </CosmicFormField>

          <CosmicFormField>
            <CosmicLabel htmlFor="message">Mensagem *</CosmicLabel>
            <CosmicTextarea
              id="message"
              name="message"
              placeholder="Conte-nos mais sobre sua dúvida ou sugestão..."
              rows={6}
              required
            />
            <CosmicFormDescription>Mínimo de 10 caracteres</CosmicFormDescription>
          </CosmicFormField>

          <CosmicSubmitButton loadingText="Enviando...">Enviar Mensagem</CosmicSubmitButton>
        </form>
      </CardContent>
    </CosmicCard>
  )
}
