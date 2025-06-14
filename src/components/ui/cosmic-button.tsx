import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// type CosmicVariant = typeof cosmicVariants[number];
type CosmicVariant =
  | "cosmic"
  | "cosmic-outline"
  | "cosmic-ghost"
  | "cosmic-destructive";

interface CosmicButtonProps extends React.ComponentProps<"button"> {
  variant?: CosmicVariant;
}

const variantClasses: Record<CosmicVariant, string> = {
  cosmic:
    "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/25 border-0",
  "cosmic-outline":
    "border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 bg-transparent",
  "cosmic-ghost":
    "text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 bg-transparent border-0",
  "cosmic-destructive":
    "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/25 border-0",
};

const CosmicButton = forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className, variant = "cosmic", ...props }, ref) => {
    return (
      <Button
        className={cn(variantClasses[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CosmicButton.displayName = "CosmicButton";

export { CosmicButton };
