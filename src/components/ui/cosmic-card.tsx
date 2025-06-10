import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CosmicCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
}

export function CosmicCard({ children, className, ...props }: CosmicCardProps) {
  return (
    <Card
      className={cn("bg-slate-900/80 border-purple-500/30 backdrop-blur-sm shadow-2xl shadow-purple-500/10", className)}
      {...props}
    >
      {children}
    </Card>
  )
}

export { CardContent, CardDescription, CardHeader, CardTitle }
