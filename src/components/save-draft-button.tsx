"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createLetterAction } from "@/lib/actions";
import { toast } from "sonner";
import type { CreateLetterInput } from "@/lib/schemas/letter";

interface SaveDraftButtonProps {
  formData: CreateLetterInput;
}

export default function SaveDraftButton({ formData }: SaveDraftButtonProps) {
  const [isSaving, setIsSaving] = useState(false);

  async function handleClick() {
    try {
      setIsSaving(true);

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title ?? "");
      formDataObj.append("content", formData.content);
      formDataObj.append("releaseDate", formData.releaseDate);
      formDataObj.append("status", "draft");

      const result = await createLetterAction(formDataObj);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Rascunho salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao salvar o rascunho");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isSaving}
      variant="outline"
      className="w-full text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-md"
    >
      <Save className="h-5 w-5" />
      {isSaving ? "Salvando..." : "Salvar Rascunho"}
    </Button>
  );
}
