import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CosmicBadgeProps extends BadgeProps {
  variant?: "cosmic" | "cosmic-outline" | "cosmic-destructive" | "cosmic-success" | "cosmic-warning"
}

const CosmicBadge = forwardRef<HTMLDivElement, CosmicBadgeProps>(({ className, variant = "cosmic", ...props }, ref) => {
  const variants = {
    cosmic: "bg-purple-600 text-white hover:bg-purple-700",
    "cosmic-outline": "border-purple-500 text-purple-300 bg-transparent hover:bg-purple-500/10",
    "cosmic-destructive": "bg-red-600 text-white hover:bg-red-700",
    "cosmic-success": "bg-green-600 text-white hover:bg-green-700",
    "cosmic-warning": "bg-yellow-600 text-white hover:bg-yellow-700",
  }

  return <Badge className={cn(variants[variant], className)} ref={ref} {...props} />
})

CosmicBadge.displayName = "CosmicBadge"

export { CosmicBadge }
