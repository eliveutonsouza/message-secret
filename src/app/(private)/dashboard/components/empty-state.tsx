import { FileText } from "lucide-react";
import { CreateLetterButton } from "./create-letter-button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-white/5 p-4 mb-4">
        <FileText className="h-8 w-8 text-white/50" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nenhuma carta encontrada</h3>
      <p className="text-white/50 mb-6">
        Crie sua primeira carta para começar a compartilhar suas mensagens.
      </p>
      <CreateLetterButton />
    </div>
  );
}
