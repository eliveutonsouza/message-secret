"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLetterSchema, UpdateLetterInput } from "@/lib/schemas/letter";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AppointmentPicker from "@/components/ui/appointment-picker";
import { updateLetterAction } from "@/lib/actions";

interface EditLetterFormProps {
  letter: {
    id: string;
    title: string;
    content: string;
    releaseDate: string;
    status: string;
  };
}

export default function EditLetterForm({ letter }: EditLetterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<UpdateLetterInput>({
    resolver: zodResolver(updateLetterSchema),
    defaultValues: {
      title: letter.title || "",
      content: letter.content || "",
      releaseDate: letter.releaseDate || "",
    },
  });

  const content = form.watch("content") || "";
  const contentProgress = (content.length / 5000) * 100;

  async function handleSubmit(data: UpdateLetterInput) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("content", data.content || "");
      formData.append("releaseDate", data.releaseDate || "");
      await updateLetterAction(letter.id, formData);
      toast.success("Carta atualizada com sucesso!");
    } catch {
      toast.error("Erro ao atualizar carta");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Título da Carta (opcional)
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60"
                  placeholder="Ex: Para meu amor no futuro..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription className="text-purple-100/90">
                Um título ajuda a identificar sua carta no dashboard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Sua Mensagem Cósmica *
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60"
                  placeholder="Escreva aqui sua mensagem que transcenderá o tempo..."
                  rows={8}
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <FormDescription className="text-purple-100/90">
                    {content.length}/5000 caracteres
                  </FormDescription>
                  <FormDescription className="text-purple-100/90 shadow-md">
                    {contentProgress.toFixed(0)}%
                  </FormDescription>
                </div>
                <div className="h-2 bg-gradient-to-r from-purple-950 via-purple-800 to-blue-900 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 h-full shadow-lg"
                    style={{ width: `${contentProgress}%` }}
                  />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="releaseDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Data e Horário de Liberação *
              </FormLabel>
              <AppointmentPicker
                value={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-purple-100/90">
                A carta só poderá ser lida após esta data e horário (máximo 15
                dias)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center gap-2 shadow-md"
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
