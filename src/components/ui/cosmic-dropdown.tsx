import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicDropdownMenuContentProps extends React.ComponentProps<typeof DropdownMenuContent> {}

export function CosmicDropdownMenuContent({ className, ...props }: CosmicDropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      className={cn("bg-slate-900/95 border-purple-500/30 backdrop-blur-sm", className)}
      {...props}
    />
  )
}

interface CosmicDropdownMenuItemProps extends React.ComponentProps<typeof DropdownMenuItem> {}

export function CosmicDropdownMenuItem({ className, ...props }: CosmicDropdownMenuItemProps) {
  return (
    <DropdownMenuItem
      className={cn("text-purple-200 focus:bg-purple-500/20 focus:text-purple-100", className)}
      {...props}
    />
  )
}

interface CosmicDropdownMenuLabelProps extends React.ComponentProps<typeof DropdownMenuLabel> {}

export function CosmicDropdownMenuLabel({ className, ...props }: CosmicDropdownMenuLabelProps) {
  return <DropdownMenuLabel className={cn("text-purple-300", className)} {...props} />
}

export { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger }
