import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicSeparator } from "@/components/ui/cosmic-separator";
import { CosmicAlert, AlertDescription } from "@/components/ui/cosmic-alert";
import { LoginForm } from "./login-form";
import { SocialLoginButtons } from "./social-login-buttons";
import { AlertCircle, Heart } from "lucide-react";
import Link from "next/link";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
              Cartas Cósmicas
            </h1>
          </Link>
          <p className="text-purple-200 text-sm">
            Entre na sua jornada através do espaço-tempo
          </p>
        </div>

        {/* Login Card */}
        <CosmicCard className="backdrop-blur-sm bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-indigo-900/80 border-purple-500/30 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Acesso à Dimensão Cósmica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <CosmicAlert
                variant="cosmic-destructive"
                className="border-red-500/50 bg-red-900/20"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Erro na autenticação. Tente novamente.
                </AlertDescription>
              </CosmicAlert>
            )}

            <LoginForm callbackUrl={callbackUrl} />

            <div className="relative">
              <CosmicSeparator className="bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 px-4 py-1 text-purple-200 text-xs uppercase font-medium rounded-full border border-purple-500/30">
                  ou continue com
                </span>
              </div>
            </div>

            <SocialLoginButtons callbackUrl={callbackUrl} />
          </CardContent>
        </CosmicCard>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-purple-300 hover:text-purple-200 text-sm transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
