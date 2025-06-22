"use client";

import { CosmicButton } from "@/components/ui/cosmic-button";
import { signInWithGoogle } from "@/lib/actions";
import { Sparkles, Zap } from "lucide-react";

interface SocialLoginButtonsProps {
  callbackUrl?: string;
}

export function SocialLoginButtons({ callbackUrl }: SocialLoginButtonsProps) {
  function handleGoogleLogin() {
    signInWithGoogle(callbackUrl);
  }

  return (
    <div className="space-y-3">
      <CosmicButton
        variant="cosmic-outline"
        className="w-full bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-indigo-900/50 border-purple-500/50 hover:border-purple-400/70 hover:bg-gradient-to-r hover:from-purple-800/60 hover:via-pink-800/60 hover:to-indigo-800/60 text-purple-200 hover:text-purple-100 font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
        onClick={handleGoogleLogin}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <Sparkles className="h-5 w-5 group-hover:animate-spin" />
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span>Continuar com Google</span>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
        </div>
      </CosmicButton>

      <div className="text-center">
        <p className="text-purple-300 text-xs">
          🔐 Login seguro e rápido com sua conta Google
        </p>
      </div>
    </div>
  );
}
