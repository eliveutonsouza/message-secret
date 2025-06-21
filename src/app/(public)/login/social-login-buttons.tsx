"use client";

import { CosmicButton } from "@/components/ui/cosmic-button";
import { signInWithGoogle } from "@/lib/actions";
import { Sparkles } from "lucide-react";

interface SocialLoginButtonsProps {
  callbackUrl?: string;
}

export function SocialLoginButtons({ callbackUrl }: SocialLoginButtonsProps) {
  function handleGoogleLogin() {
    signInWithGoogle(callbackUrl);
  }

  return (
    <CosmicButton
      variant="cosmic-outline"
      className="w-full"
      onClick={handleGoogleLogin}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      Google
    </CosmicButton>
  );
}
