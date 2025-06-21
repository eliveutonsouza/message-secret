import { CosmicButton } from "@/components/ui/cosmic-button";
import { CreateLetterForm } from "./components/create-letter-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth";

export default async function CreateLetterPage() {
  await requireAuth();

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <CosmicButton variant="cosmic-ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </CosmicButton>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold cosmic-text-glow">
                Criar Carta Cósmica
              </h1>
              <p className="text-purple-200">
                Escreva uma mensagem que transcenderá o tempo
              </p>
            </div>
          </div>

          <CreateLetterForm />
        </div>
      </div>
    </div>
  );
}
