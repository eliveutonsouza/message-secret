import { CosmicCard, CardContent } from "@/components/ui/cosmic-card"
import { CosmicButton } from "@/components/ui/cosmic-button"
import { CosmicBadge } from "@/components/ui/cosmic-badge"
import { CosmicSeparator } from "@/components/ui/cosmic-separator"
import { Rocket, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <CosmicCard className="max-w-md text-center">
        <CardContent className="p-8">
          <CosmicBadge variant="cosmic-destructive" className="mb-6">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Erro 404
          </CosmicBadge>

          <Rocket className="h-24 w-24 text-purple-400 mx-auto mb-6 animate-bounce" />

          <h1 className="text-4xl font-bold cosmic-text-glow mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-purple-200 mb-4">Perdido no Espaço</h2>

          <CosmicSeparator className="my-6" />

          <p className="text-purple-300 mb-8">
            Parece que você se perdeu nas vastidões do cosmos. Esta página não existe em nossa dimensão.
          </p>

          <Link href="/">
            <CosmicButton>
              <Home className="mr-2 h-4 w-4" />
              Voltar à Terra
            </CosmicButton>
          </Link>
        </CardContent>
      </CosmicCard>
    </div>
  )
}
