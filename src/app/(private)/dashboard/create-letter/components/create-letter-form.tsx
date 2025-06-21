"use client";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createLetterSchema } from "@/lib/schemas/letter";
import { createLetterAction } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, Save } from "lucide-react";
import AppointmentPicker from "@/components/ui/appointment-picker";

export function CreateLetterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(createLetterSchema),
    defaultValues: {
      title: "",
      content: "",
      releaseDate: "",
    },
  });

  const content = form.watch("content");
  const contentProgress = (content.length / 5000) * 100;

  async function handleSaveDraft() {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", form.getValues("title") ?? "");
      formData.append("content", form.getValues("content"));
      formData.append("releaseDate", form.getValues("releaseDate"));
      formData.append("status", "DRAFT");

      const result = await createLetterAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Rascunho salvo com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      // Se o erro não for uma instância de Error, exiba uma mensagem genérica
      toast.error("Erro ao salvar rascunho");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleBuy() {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", form.getValues("title") ?? "");
      formData.append("content", form.getValues("content"));
      formData.append("releaseDate", form.getValues("releaseDate"));
      formData.append("status", "ACTIVE");

      const result = await createLetterAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // O redirecionamento para o checkout é feito no createLetterAction
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      // Se o erro não for uma instância de Error, exiba uma mensagem genérica
      toast.error("Erro ao processar sua solicitação");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
          render={({ field }) => {
            return (
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
            );
          }}
        />

        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 rounded-lg p-4 flex items-center gap-3 border border-purple-800/40 shadow-md">
          <Info className="h-4 w-4 text-fuchsia-400" />
          <div>
            <h3 className="font-semibold text-fuchsia-300">
              💫 Investimento Cósmico
            </h3>
            <p className="text-sm text-purple-100">
              Cada carta cósmica custa apenas{" "}
              <strong className="text-fuchsia-300">R$ 5,99</strong>
            </p>
            <p className="text-xs opacity-80 text-purple-300">
              Após criar a carta, você será direcionado para o pagamento seguro
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleBuy}
            disabled={isSubmitting}
            className="w-full flex items-center gap-2 shadow-md"
          >
            <Sparkles className="h-5 w-5" />
            {isSubmitting ? "Processando..." : "Comprar Carta Cósmica"}
          </Button>
          <Button
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            variant="outline"
            className="w-full text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-md"
          >
            <Save className="h-5 w-5" />
            {isSubmitting ? "Salvando..." : "Salvar Rascunho"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
