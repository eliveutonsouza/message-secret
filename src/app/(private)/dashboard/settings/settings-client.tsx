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
import {
  ArrowLeft,
  User,
  Mail,
  Save,
  Shield,
  Bell,
  Palette,
  Lock,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updateProfileSchema, UpdateProfileInput } from "@/lib/schemas/user";
import { updateProfileAction } from "@/lib/actions";
import { DeleteAccountDialog } from "@/components/ui/delete-account-dialog";
import { SessionsDialog } from "@/components/ui/sessions-dialog";

interface SettingsClientProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
  };
}

export function SettingsClient({ user }: SettingsClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Estados para notificações
  const [emailConfirmation, setEmailConfirmation] = useState(true);
  const [releaseReminders, setReleaseReminders] = useState(true);
  const [newsUpdates, setNewsUpdates] = useState(false);

  // Estados para aparência
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedDensity, setSelectedDensity] = useState("comfortable");

  // Estados para dialogs
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSessionsDialogOpen, setIsSessionsDialogOpen] = useState(false);

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

  const handleNotificationToggle = (type: string) => {
    switch (type) {
      case "emailConfirmation":
        setEmailConfirmation(!emailConfirmation);
        toast.success(
          emailConfirmation ? "Notificação desativada" : "Notificação ativada"
        );
        break;
      case "releaseReminders":
        setReleaseReminders(!releaseReminders);
        toast.success(
          releaseReminders ? "Lembretes desativados" : "Lembretes ativados"
        );
        break;
      case "newsUpdates":
        setNewsUpdates(!newsUpdates);
        toast.success(
          newsUpdates ? "Atualizações desativadas" : "Atualizações ativadas"
        );
        break;
    }
  };

  const handleThemeChange = (theme: string) => {
    if (theme === "light") {
      toast.info(
        "Tema claro em breve! Por enquanto, apenas o tema escuro está disponível."
      );
      return;
    }
    setSelectedTheme(theme);
    toast.success("Tema alterado com sucesso!");
  };

  const handleDensityChange = (density: string) => {
    if (density === "compact" || density === "spacious") {
      toast.info("Essa densidade estará disponível em breve!");
      return;
    }
    setSelectedDensity(density);
    toast.success("Densidade alterada com sucesso!");
  };

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "appearance", label: "Aparência", icon: Palette },
    { id: "security", label: "Segurança", icon: Lock },
    { id: "account", label: "Conta", icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
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
        <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
        <p className="text-purple-300">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com abas */}
        <div className="lg:col-span-1">
          <CosmicCard>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-purple-600/20 text-purple-200 border border-purple-500/30"
                          : "text-purple-300 hover:text-purple-200 hover:bg-purple-600/10"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </CosmicCard>
        </div>

        {/* Conteúdo das abas */}
        <div className="lg:col-span-3">
          {/* Aba Perfil */}
          {activeTab === "profile" && (
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
                          <FormLabel className="text-purple-200">
                            Nome
                          </FormLabel>
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
          )}

          {/* Aba Notificações */}
          {activeTab === "notifications" && (
            <CosmicCard>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-purple-300" />
                  <CardTitle className="text-purple-200">
                    Notificações
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/30">
                    <div>
                      <h3 className="text-purple-200 font-medium">
                        Email de Confirmação
                      </h3>
                      <p className="text-purple-300 text-sm">
                        Receber confirmação quando uma carta for ativada
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("emailConfirmation")
                      }
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                        emailConfirmation ? "bg-purple-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          emailConfirmation ? "left-0.5" : "right-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/30">
                    <div>
                      <h3 className="text-purple-200 font-medium">
                        Lembretes de Liberação
                      </h3>
                      <p className="text-purple-300 text-sm">
                        Receber lembretes quando cartas estiverem próximas da
                        liberação
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("releaseReminders")
                      }
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                        releaseReminders ? "bg-purple-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          releaseReminders ? "left-0.5" : "right-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/30">
                    <div>
                      <h3 className="text-purple-200 font-medium">
                        Novidades e Atualizações
                      </h3>
                      <p className="text-purple-300 text-sm">
                        Receber informações sobre novos recursos e melhorias
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("newsUpdates")}
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                        newsUpdates ? "bg-purple-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          newsUpdates ? "left-0.5" : "right-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </CardContent>
            </CosmicCard>
          )}

          {/* Aba Aparência */}
          {activeTab === "appearance" && (
            <CosmicCard>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="h-6 w-6 text-purple-300" />
                  <CardTitle className="text-purple-200">Aparência</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-purple-200 font-medium mb-3">Tema</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleThemeChange("light")}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-700/30 cursor-not-allowed opacity-50"
                        disabled
                      >
                        <Sun className="h-5 w-5 text-yellow-400" />
                        <div>
                          <p className="text-purple-300 font-medium">Claro</p>
                          <p className="text-purple-400 text-sm">Em breve</p>
                        </div>
                      </button>
                      <button
                        onClick={() => handleThemeChange("dark")}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                          selectedTheme === "dark"
                            ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/50"
                            : "bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-700/30 hover:border-purple-500/50"
                        }`}
                      >
                        <Moon className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-purple-200 font-medium">Escuro</p>
                          <p className="text-purple-300 text-sm">
                            Tema escuro cósmico
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <CosmicSeparator />

                  <div>
                    <h3 className="text-purple-200 font-medium mb-3">
                      Densidade da Interface
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleDensityChange("compact")}
                        className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg cursor-not-allowed opacity-50"
                        disabled
                      >
                        <span className="text-purple-300">Compacta</span>
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      </button>
                      <button
                        onClick={() => handleDensityChange("comfortable")}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedDensity === "comfortable"
                            ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30"
                            : "bg-gradient-to-r from-purple-900/20 to-pink-900/20 hover:bg-gradient-to-r hover:from-purple-900/25 hover:to-pink-900/25"
                        }`}
                      >
                        <span className="text-purple-200">Confortável</span>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            selectedDensity === "comfortable"
                              ? "bg-purple-600"
                              : "bg-gray-600"
                          }`}
                        ></div>
                      </button>
                      <button
                        onClick={() => handleDensityChange("spacious")}
                        className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg cursor-not-allowed opacity-50"
                        disabled
                      >
                        <span className="text-purple-300">Espaçosa</span>
                        <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CosmicCard>
          )}

          {/* Aba Segurança */}
          {activeTab === "security" && (
            <CosmicCard>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-purple-300" />
                  <CardTitle className="text-purple-200">Segurança</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg border border-green-700/30">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <h3 className="text-green-200 font-medium">
                        Autenticação Segura
                      </h3>
                    </div>
                    <p className="text-green-300 text-sm">
                      Sua conta está protegida com autenticação via Google e
                      magic links
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-700/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <h3 className="text-blue-200 font-medium">
                        Proteção de Dados
                      </h3>
                    </div>
                    <p className="text-blue-300 text-sm">
                      Seus dados são criptografados e protegidos conforme as
                      melhores práticas
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-700/30">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <h3 className="text-yellow-200 font-medium">
                        Sessões Ativas
                      </h3>
                    </div>
                    <p className="text-purple-300 text-sm mb-3">
                      Gerencie suas sessões ativas em diferentes dispositivos
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-600/10"
                      onClick={() => setIsSessionsDialogOpen(true)}
                    >
                      Ver Sessões
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CosmicCard>
          )}

          {/* Aba Conta */}
          {activeTab === "account" && (
            <div className="space-y-6">
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

              <CosmicCard>
                <CardHeader>
                  <CardTitle className="text-red-200">Zona de Perigo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg border border-red-700/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Trash2 className="h-5 w-5 text-red-400" />
                      <h3 className="text-red-200 font-medium">
                        Excluir Conta
                      </h3>
                    </div>
                    <p className="text-red-300 text-sm mb-3">
                      Esta ação é irreversível. Todas as suas cartas e dados
                      serão permanentemente excluídos.
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Excluir Conta
                    </Button>
                  </div>
                </CardContent>
              </CosmicCard>
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        userEmail={user.email}
      />

      <SessionsDialog
        isOpen={isSessionsDialogOpen}
        onClose={() => setIsSessionsDialogOpen(false)}
      />
    </div>
  );
}
