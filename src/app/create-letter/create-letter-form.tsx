"use client"

import { CosmicCard, CardContent, CardHeader, CardTitle } from "@/components/ui/cosmic-card"
import {
  CosmicInput,
  CosmicLabel,
  CosmicFormField,
  CosmicFormDescription,
  CosmicTextarea,
  CosmicSubmitButton,
} from "@/components/ui/cosmic-form"
import { CosmicAlert, AlertDescription } from "@/components/ui/cosmic-alert"
import { CosmicProgress } from "@/components/ui/cosmic-progress"
import { createLetterAction } from "@/lib/actions"
import { Sparkles, Info } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function CreateLetterForm() {
  const [content, setContent] = useState("")

  async function handleSubmit(formData: FormData) {
    const result = await createLetterAction(formData)

    if (result?.error) {
      toast.error(result.error)
    }
    // Success case is handled by redirect in the action
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().slice(0, 16)

  const contentProgress = (content.length / 5000) * 100

  return (
    <CosmicCard>
      <CardHeader>
        <CardTitle className="text-purple-200">Nova Mensagem Cósmica</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <CosmicFormField>
            <CosmicLabel htmlFor="title">Título da Carta (opcional)</CosmicLabel>
            <CosmicInput id="title" name="title" placeholder="Ex: Para meu amor no futuro..." />
            <CosmicFormDescription>Um título ajuda a identificar sua carta no dashboard</CosmicFormDescription>
          </CosmicFormField>

          <CosmicFormField>
            <CosmicLabel htmlFor="content">Sua Mensagem Cósmica *</CosmicLabel>
            <CosmicTextarea
              id="content"
              name="content"
              placeholder="Escreva aqui sua mensagem que transcenderá o tempo..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <CosmicFormDescription>{content.length}/5000 caracteres</CosmicFormDescription>
                <CosmicFormDescription>{contentProgress.toFixed(0)}%</CosmicFormDescription>
              </div>
              <CosmicProgress value={contentProgress} className="h-2" />
            </div>
          </CosmicFormField>

          <CosmicFormField>
            <CosmicLabel htmlFor="releaseDate">Data de Liberação *</CosmicLabel>
            <CosmicInput id="releaseDate" name="releaseDate" type="datetime-local" min={minDate} required />
            <CosmicFormDescription>A carta só poderá ser lida após esta data</CosmicFormDescription>
          </CosmicFormField>

          <CosmicAlert variant="cosmic">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h3 className="font-semibold">💫 Investimento Cósmico</h3>
                <p className="text-sm">
                  Cada carta cósmica custa apenas <strong>R$ 2,99</strong>
                </p>
                <p className="text-xs opacity-80">Após criar a carta, você será direcionado para o pagamento seguro</p>
              </div>
            </AlertDescription>
          </CosmicAlert>

          <CosmicSubmitButton loadingText="Criando Carta...">
            <Sparkles className="h-5 w-5" />
            Criar Carta Cósmica
          </CosmicSubmitButton>
        </form>
      </CardContent>
    </CosmicCard>
  )
}
