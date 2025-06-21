"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Letter } from "@prisma/client";

interface PasswordScreenProps {
  letter: Letter;
}

export function PasswordScreen({ letter }: PasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Por favor, digite a senha");
      return;
    }

    setIsSubmitting(true);

    // Redirecionar com a senha como parâmetro
    const params = new URLSearchParams(searchParams);
    params.set("password", password);

    router.push(`/letter/${letter.uniqueLink}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <CosmicCard className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-16 w-16 text-purple-400" />
          </div>
          <CardTitle className="text-2xl cosmic-text-glow">
            Carta Protegida
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <p className="text-purple-300 mb-2">
              Esta carta está protegida por senha
            </p>
            {letter.title && (
              <p className="text-white font-semibold">{letter.title}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digite a senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60 pr-12"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-200"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <CosmicButton
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Verificando..." : "Acessar Carta"}
            </CosmicButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-purple-400">
              Entre em contato com o remetente se você não souber a senha
            </p>
          </div>
        </CardContent>
      </CosmicCard>
    </div>
  );
}
