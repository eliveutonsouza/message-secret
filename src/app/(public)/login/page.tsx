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
import { AlertCircle, Sparkles, Star, Heart, Zap } from "lucide-react";
import Link from "next/link";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-pulse">
          <Star className="h-4 w-4 text-yellow-400" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse animation-delay-1000">
          <Star className="h-3 w-3 text-pink-400" />
        </div>
        <div className="absolute bottom-32 left-32 animate-pulse animation-delay-2000">
          <Star className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse animation-delay-3000">
          <Star className="h-4 w-4 text-blue-400" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform">
              Cartas Cósmicas
            </h1>
          </Link>
          <p className="text-purple-200 text-lg font-medium mb-2">
            ✨ Entre na sua jornada através do espaço-tempo ✨
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-300 text-sm">
            <Zap className="h-4 w-4" />
            <span>Mensagens que transcendem o tempo</span>
            <Zap className="h-4 w-4" />
          </div>
        </div>

        {/* Login Card */}
        <CosmicCard className="backdrop-blur-sm bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-indigo-900/80 border-purple-500/30 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-purple-300" />
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Acesso à Dimensão Cósmica
              </CardTitle>
              <Sparkles className="h-6 w-6 text-purple-300" />
            </div>
            <p className="text-purple-300 text-sm">
              Escolha sua forma de entrar no universo das cartas mágicas
            </p>
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
                  ✨ ou continue com ✨
                </span>
              </div>
            </div>

            <SocialLoginButtons callbackUrl={callbackUrl} />

            {/* Features Preview */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg border border-purple-500/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-purple-200 text-xs font-medium">
                    Amor Eterno
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-purple-200 text-xs font-medium">
                    Momentos Únicos
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-purple-200 text-xs font-medium">
                    Magia Cósmica
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CosmicCard>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm transition-colors group"
          >
            <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-purple-300 transition-colors"></div>
            Voltar ao início
            <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-purple-300 transition-colors"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
