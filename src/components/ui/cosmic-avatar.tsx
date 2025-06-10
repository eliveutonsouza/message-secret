import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string
  alt?: string
  fallback?: string
}

export function CosmicAvatar({ className, src, alt, fallback, ...props }: CosmicAvatarProps) {
  return (
    <Avatar className={cn("border-2 border-purple-500/30", className)} {...props}>
      <AvatarImage src={src || "/placeholder.svg"} alt={alt} />
      <AvatarFallback className="bg-purple-900/50 text-purple-200">{fallback}</AvatarFallback>
    </Avatar>
  )
}
