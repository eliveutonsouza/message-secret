import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicSeparatorProps extends React.ComponentProps<typeof Separator> {}

export function CosmicSeparator({ className, ...props }: CosmicSeparatorProps) {
  return <Separator className={cn("bg-purple-500/30", className)} {...props} />
}
