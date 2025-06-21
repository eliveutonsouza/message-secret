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
import { createLetterSchema, CreateLetterInput } from "@/lib/schemas/letter";
import { createLetterAction } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, MessageSquare, Shield, Clock } from "lucide-react";
import ReleaseDatePicker from "@/components/ui/release-date-picker";
import ExpirationPicker from "@/components/ui/expiration-picker";
import BuyButton from "@/components/buy-button";

export function CreateLetterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateLetterInput>({
    resolver: zodResolver(createLetterSchema),
    defaultValues: {
      title: "",
      content: "",
      releaseDate: "",
      status: "DRAFT",
      accessPassword: "",
      maxViews: undefined,
      expiresAt: "",
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
      formData.append("accessPassword", form.getValues("accessPassword") ?? "");
      formData.append("maxViews", form.getValues("maxViews") ?? "");
      formData.append("expiresAt", form.getValues("expiresAt") ?? "");

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
      toast.error("Erro ao salvar rascunho");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateLetterForPayment() {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", form.getValues("title") ?? "");
      formData.append("content", form.getValues("content"));
      formData.append("releaseDate", form.getValues("releaseDate"));
      formData.append("status", "DRAFT");
      formData.append("accessPassword", form.getValues("accessPassword") ?? "");
      formData.append("maxViews", form.getValues("maxViews") ?? "");
      formData.append("expiresAt", form.getValues("expiresAt") ?? "");

      const result = await createLetterAction(formData);
      if (result?.error) {
        toast.error(result.error);
        return null;
      }

      if (result.success && result.details?.letterId) {
        return result.details.letterId;
      }

      toast.error("Erro ao criar carta");
      return null;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return null;
      }
      toast.error("Erro ao processar sua solicitação");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Seção 1: Informações Básicas */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-purple-800/40">
            <MessageSquare className="h-5 w-5 text-fuchsia-400" />
            <h2 className="text-xl font-semibold text-white">
              Informações da Carta
            </h2>
          </div>

          <div className="grid gap-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    <span className="text-fuchsia-400">*</span>
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
                  <FormLabel className="text-white flex items-center gap-2">
                    <span className="text-fuchsia-400">*</span>
                    Sua Mensagem Cósmica
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60 min-h-[200px]"
                      placeholder="Escreva aqui sua mensagem que transcenderá o tempo..."
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
                        className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 h-full shadow-lg transition-all duration-300"
                        style={{ width: `${contentProgress}%` }}
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Seção 2: Configurações de Tempo */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-purple-800/40">
            <Clock className="h-5 w-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">
              Configurações de Tempo
            </h2>
          </div>

          <div className="grid gap-6">
            <FormField
              name="releaseDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    <span className="text-fuchsia-400">*</span>
                    Data e Horário de Liberação
                  </FormLabel>
                  <FormControl>
                    <ReleaseDatePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-purple-100/90">
                    A carta só poderá ser lida após esta data e horário (máximo
                    15 dias)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="expiresAt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    Data de Expiração do Link (opcional)
                  </FormLabel>
                  <FormControl>
                    <ExpirationPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-purple-100/90">
                    Após essa data, ninguém poderá acessar a carta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Seção 3: Configurações de Segurança */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-purple-800/40">
            <Shield className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Configurações de Segurança
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              name="accessPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    Senha de Acesso (opcional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60"
                      placeholder="Defina uma senha para proteger sua carta"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription className="text-purple-100/90">
                    Se preenchido, só quem souber a senha poderá acessar a carta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="maxViews"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white flex items-center gap-2">
                    Limite de Visualizações (opcional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={1000}
                      className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60"
                      placeholder="Ex: 5"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription className="text-purple-100/90">
                    Após atingir esse limite, a carta não poderá mais ser
                    visualizada
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Seção 4: Informações de Pagamento */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 rounded-lg p-6 border border-purple-800/40 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Info className="h-5 w-5 text-fuchsia-400" />
            <h3 className="font-semibold text-fuchsia-300 text-lg">
              💫 Investimento Cósmico
            </h3>
          </div>
          <div className="space-y-2 text-purple-100">
            <p className="text-sm">
              Cada carta cósmica custa apenas{" "}
              <strong className="text-fuchsia-300 text-lg">R$ 5,99</strong>
            </p>
            <p className="text-xs opacity-80 text-purple-300">
              Após criar a carta, você será direcionado para o pagamento seguro
            </p>
          </div>
        </div>

        {/* Seção 5: Ações */}
        <div className="space-y-4 pt-4">
          <BuyButton
            onCreateLetter={handleCreateLetterForPayment}
            disabled={isSubmitting}
          />
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
