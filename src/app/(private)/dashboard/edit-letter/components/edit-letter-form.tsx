"use client";
import { useState, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import { MessageSquare, Shield, Clock, Save } from "lucide-react";
import ReleaseDatePicker from "@/components/ui/release-date-picker";
import ExpirationPicker from "@/components/ui/expiration-picker";
import { updateLetterAction } from "@/lib/actions";

interface EditLetterFormProps {
  letter: {
    id: string;
    title: string;
    content: string;
    releaseDate: string;
    status: string;
    accessPassword?: string | null;
    maxViews?: number | null;
    expiresAt?: Date | null;
  };
}

export default function EditLetterForm({ letter }: EditLetterFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<UpdateLetterInput>({
    resolver: zodResolver(updateLetterSchema),
    defaultValues: {
      title: letter.title || "",
      content: letter.content || "",
      releaseDate: letter.releaseDate || "",
      accessPassword: letter.accessPassword || "",
      maxViews: letter.maxViews?.toString() || "",
      expiresAt: letter.expiresAt
        ? letter.expiresAt.toISOString().slice(0, 16)
        : "",
    },
  });

  const content = form.watch("content") || "";
  const contentProgress = useMemo(
    () => (content.length / 5000) * 100,
    [content.length]
  );

  async function handleSubmit(data: UpdateLetterInput) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("content", data.content || "");
      formData.append("releaseDate", data.releaseDate || "");
      formData.append("accessPassword", data.accessPassword || "");
      formData.append("maxViews", data.maxViews || "");
      formData.append("expiresAt", data.expiresAt || "");
      await updateLetterAction(letter.id, formData);
      toast.success("Carta atualizada com sucesso!");
      router.push("/dashboard");
    } catch {
      toast.error("Erro ao atualizar carta");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete="off"
      >
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
                    Título da Carta
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gradient-to-r from-purple-950 via-purple-900 to-blue-950 shadow-md border-none text-white placeholder:text-purple-300 focus:ring-2 focus:ring-fuchsia-500/60"
                      placeholder="Ex: O que eu nunca te disse sobre nós..."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <div className="space-y-2">
                    <FormDescription className="text-purple-100/90">
                      Um título ajuda a identificar sua carta no dashboard
                    </FormDescription>
                    <div className="p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-700/40">
                      <p className="text-yellow-200 text-xs font-medium mb-1">
                        💡 Dica Estratégica:
                      </p>
                      <p className="text-yellow-100 text-xs">
                        O título é visível antes da data de liberação.{" "}
                        <strong>Não coloque seu nome</strong> - use algo que
                        instigue curiosidade e mistério!
                      </p>
                    </div>
                  </div>
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
                      placeholder="Querido(a) [nome], só queria que você soubesse o quanto é especial para mim. Cada momento ao seu lado faz meu mundo mais bonito. Guardei essas palavras para o momento certo. Com carinho, [seu nome]"
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

        {/* Seção 4: Ações */}
        <div className="space-y-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
