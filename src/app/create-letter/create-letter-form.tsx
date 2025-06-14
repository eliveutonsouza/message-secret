"use client";

import { createLetterAction } from "@/lib/actions";
import { Sparkles, Info } from "lucide-react";
import { toast } from "sonner";
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

export function CreateLetterForm() {
  const form = useForm({
    resolver: zodResolver(createLetterSchema),
    defaultValues: {
      title: "",
      content: "",
      releaseDate: "",
    },
  });

  async function onSubmit(values) {
    const result = await createLetterAction(values);
    if (result?.error) {
      toast.error(result.error);
    }
    // Success case is handled by redirect in the action
  }

  const content = form.watch("content");
  const contentProgress = (content.length / 5000) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título da Carta (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Para meu amor no futuro..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
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
              <FormLabel>Sua Mensagem Cósmica *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva aqui sua mensagem que transcenderá o tempo..."
                  rows={8}
                  {...field}
                />
              </FormControl>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <FormDescription>
                    {content.length}/5000 caracteres
                  </FormDescription>
                  <FormDescription>
                    {contentProgress.toFixed(0)}%
                  </FormDescription>
                </div>
                <div className="h-2 bg-purple-900 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-full"
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
              <FormLabel>Data de Liberação *</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  min={new Date(Date.now() + 86400000)
                    .toISOString()
                    .slice(0, 16)}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A carta só poderá ser lida após esta data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="bg-purple-900/30 rounded-lg p-4 flex items-center gap-3">
          <Info className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">💫 Investimento Cósmico</h3>
            <p className="text-sm">
              Cada carta cósmica custa apenas <strong>R$ 2,99</strong>
            </p>
            <p className="text-xs opacity-80">
              Após criar a carta, você será direcionado para o pagamento seguro
            </p>
          </div>
        </div>
        <Button type="submit" className="w-full flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Criar Carta Cósmica
        </Button>
      </form>
    </Form>
  );
}
