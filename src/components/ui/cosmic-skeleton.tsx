import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type React from "react"

interface CosmicSkeletonProps extends React.ComponentProps<typeof Skeleton> {}

export function CosmicSkeleton({ className, ...props }: CosmicSkeletonProps) {
  return <Skeleton className={cn("bg-slate-800/50", className)} {...props} />
}
