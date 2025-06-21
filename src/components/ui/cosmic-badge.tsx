import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface CosmicBadgeProps extends React.ComponentProps<"span"> {
  variant?:
    | "cosmic"
    | "cosmic-outline"
    | "cosmic-destructive"
    | "cosmic-success"
    | "cosmic-warning";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

const CosmicBadge = forwardRef<HTMLDivElement, CosmicBadgeProps>(
  ({ className, variant = "cosmic", children, ...props }, ref) => {
    const variants = {
      cosmic: "bg-purple-600 text-white hover:bg-purple-700",
      "cosmic-outline":
        "border-purple-500 text-purple-300 bg-transparent hover:bg-purple-500/10",
      "cosmic-destructive": "bg-red-600 text-white hover:bg-red-700",
      "cosmic-success": "bg-green-600 text-white hover:bg-green-700",
      "cosmic-warning": "bg-yellow-600 text-white hover:bg-yellow-700",
    };

    return (
      <Badge className={cn(variants[variant], className)} ref={ref} {...props}>
        {children}
      </Badge>
    );
  }
);

CosmicBadge.displayName = "CosmicBadge";

export { CosmicBadge };
