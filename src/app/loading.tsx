import { CosmicSkeleton } from "@/components/ui/cosmic-skeleton";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <div className="relative">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto  animate-spin mb-4" />
          {/* <Loader2 className="h-8 w-8 text-purple-300 mx-auto absolute top-2 left-1/2 transform -translate-x-1/2" /> */}
        </div>
        <p className="text-purple-300 mb-4">Navegando pelas estrelas...</p>
        <div className="space-y-2">
          <CosmicSkeleton className="h-4 w-48 mx-auto" />
          <CosmicSkeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}
