"use client"

import { CosmicButton } from "@/components/ui/cosmic-button"
import { signInWithGoogle } from "@/lib/actions"
import { Sparkles } from "lucide-react"
import { toast } from "sonner"

interface SocialLoginButtonsProps {
  callbackUrl?: string
}

export function SocialLoginButtons({ callbackUrl }: SocialLoginButtonsProps) {
  async function handleGoogleLogin() {
    const result = await signInWithGoogle(callbackUrl)

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <CosmicButton variant="cosmic-outline" className="w-full" onClick={handleGoogleLogin}>
      <Sparkles className="mr-2 h-4 w-4" />
      Google
    </CosmicButton>
  )
}
