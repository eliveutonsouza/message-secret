import { CosmicCard, CardContent, CardHeader, CardTitle } from "@/components/ui/cosmic-card"
import { CosmicSeparator } from "@/components/ui/cosmic-separator"
import { CosmicAlert, AlertDescription } from "@/components/ui/cosmic-alert"
import { LoginForm } from "./login-form"
import { SocialLoginButtons } from "./social-login-buttons"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface LoginPageProps {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold cosmic-text-glow text-white mb-2">Cartas Cósmicas</h1>
          </Link>
          <p className="text-purple-200">Entre na sua jornada através do espaço-tempo</p>
        </div>

        <CosmicCard>
          <CardHeader>
            <CardTitle className="text-center text-purple-200">Acesso à Dimensão Cósmica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <CosmicAlert variant="cosmic-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Erro na autenticação. Tente novamente.</AlertDescription>
              </CosmicAlert>
            )}

            <LoginForm callbackUrl={callbackUrl} />

            <div className="relative">
              <CosmicSeparator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-slate-900 px-2 text-purple-300 text-xs uppercase">ou continue com</span>
              </div>
            </div>

            <SocialLoginButtons callbackUrl={callbackUrl} />
          </CardContent>
        </CosmicCard>

        <div className="text-center mt-6">
          <Link href="/" className="text-purple-300 hover:text-purple-200 text-sm">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
