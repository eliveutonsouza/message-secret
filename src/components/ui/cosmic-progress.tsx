import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicProgressProps extends React.ComponentProps<typeof Progress> {}

export function CosmicProgress({ className, ...props }: CosmicProgressProps) {
  return (
    <Progress
      className={cn("bg-slate-800/50 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-blue-600", className)}
      {...props}
    />
  )
}
