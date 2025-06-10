import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicAlertProps extends React.ComponentProps<typeof Alert> {
  variant?: "cosmic" | "cosmic-destructive" | "cosmic-warning" | "cosmic-success"
}

export function CosmicAlert({ className, variant = "cosmic", ...props }: CosmicAlertProps) {
  const variants = {
    cosmic: "bg-purple-900/20 border-purple-500/30 text-purple-200",
    "cosmic-destructive": "bg-red-900/20 border-red-500/30 text-red-200",
    "cosmic-warning": "bg-yellow-900/20 border-yellow-500/30 text-yellow-200",
    "cosmic-success": "bg-green-900/20 border-green-500/30 text-green-200",
  }

  return <Alert className={cn(variants[variant], className)} {...props} />
}

export { AlertDescription, AlertTitle }
