"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CosmicSeparator } from "@/components/ui/cosmic-separator";
import { ArrowLeft, User, Mail, Save, Shield } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateProfileSchema, UpdateProfileInput } from "@/lib/schemas/user";
import { updateProfileAction } from "@/lib/actions";

interface ProfileClientProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
  };
}

export function ProfileClient({ user }: ProfileClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  async function onSubmit(values: UpdateProfileInput) {
    try {
      setIsSubmitting(true);
      const result = await updateProfileAction(values);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="text-purple-300 hover:text-purple-200 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">
          Perfil & Configurações
        </h1>
        <p className="text-purple-300">
          Gerencie suas informações pessoais e configurações da conta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações do Perfil */}
        <div className="lg:col-span-2">
          <CosmicCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-purple-300" />
                <CardTitle className="text-purple-200">
                  Informações Pessoais
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-200">Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome completo"
                            className="bg-gradient-to-r from-purple-950/50 via-pink-950/50 to-indigo-950/50 border-purple-500/30 text-white placeholder:text-purple-400 focus:border-purple-400 focus:ring-purple-400/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <label className="text-purple-200 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <Input
                      value={user.email}
                      disabled
                      className="bg-gradient-to-r from-purple-950/30 via-pink-950/30 to-indigo-950/30 border-purple-500/20 text-purple-300 cursor-not-allowed"
                    />
                    <p className="text-purple-400 text-xs">
                      O email não pode ser alterado por questões de segurança
                    </p>
                  </div>

                  <CosmicButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                  </CosmicButton>
                </form>
              </Form>
            </CardContent>
          </CosmicCard>
        </div>

        {/* Sidebar com informações da conta */}
        <div className="space-y-6">
          {/* Informações da Conta */}
          <CosmicCard>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-300" />
                <CardTitle className="text-purple-200">
                  Informações da Conta
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-purple-300 text-sm">ID da Conta</p>
                <p className="text-purple-200 font-mono text-xs break-all">
                  {user.id}
                </p>
              </div>

              <CosmicSeparator />

              <div>
                <p className="text-purple-300 text-sm">Membro desde</p>
                <p className="text-purple-200">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

              <CosmicSeparator />

              <div>
                <p className="text-purple-300 text-sm">Status da Conta</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-300 text-sm">Ativa</span>
                </div>
              </div>
            </CardContent>
          </CosmicCard>

          {/* Ações da Conta */}
          <CosmicCard>
            <CardHeader>
              <CardTitle className="text-purple-200">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10"
                onClick={() => {
                  if (
                    confirm(
                      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
                    )
                  ) {
                    // Implementar exclusão da conta
                    toast.error("Funcionalidade em desenvolvimento");
                  }
                }}
              >
                Excluir Conta
              </Button>
            </CardContent>
          </CosmicCard>
        </div>
      </div>
    </div>
  );
}
