import { CosmicButton } from "@/components/ui/cosmic-button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CreateLetterButton() {
  return (
    <div className="mb-8">
      <Link href="/create-letter">
        <CosmicButton size="lg" className="text-lg px-6 py-3">
          <Plus className="mr-2 h-5 w-5" />
          Criar Nova Carta Cósmica
        </CosmicButton>
      </Link>
    </div>
  )
}
