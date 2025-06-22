"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CosmicButton } from "@/components/ui/cosmic-button";
import {
  Monitor,
  Smartphone,
  Tablet,
  X,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import {
  getUserSessionsAction,
  deleteSessionAction,
  deleteAllSessionsAction,
} from "@/lib/actions/user-actions";

interface Session {
  sessionToken: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionsDialog({ isOpen, onClose }: SessionsDialogProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    }
  }, [isOpen]);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const result = await getUserSessionsAction();

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.sessions) {
        setSessions(result.sessions);
      }
    } catch {
      toast.error("Erro ao carregar sessões");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (sessionToken: string) => {
    try {
      const result = await deleteSessionAction(sessionToken);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Sessão encerrada com sucesso");
        loadSessions();
      }
    } catch {
      toast.error("Erro ao encerrar sessão");
    }
  };

  const handleDeleteAllSessions = async () => {
    if (
      !confirm(
        "Tem certeza que deseja encerrar todas as sessões? Você será desconectado de todos os dispositivos."
      )
    ) {
      return;
    }

    try {
      setIsDeletingAll(true);
      const result = await deleteAllSessionsAction();

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Todas as sessões foram encerradas");
        loadSessions();
      }
    } catch {
      toast.error("Erro ao encerrar sessões");
    } finally {
      setIsDeletingAll(false);
    }
  };

  const getDeviceIcon = (session: Session) => {
    // Lógica simples baseada no token - em produção você pode usar User-Agent
    const token = session.sessionToken;
    if (token.includes("mobile") || token.length < 50)
      return <Smartphone className="h-4 w-4" />;
    if (token.includes("tablet") || token.length < 60)
      return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCurrentSession = (session: Session) => {
    // Lógica para identificar a sessão atual
    // Em produção, você pode comparar com a sessão atual do NextAuth
    return session.updatedAt === session.createdAt;
  };

  const isExpired = (session: Session) => {
    return new Date(session.expires) < new Date();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-950/90 via-pink-950/90 to-indigo-950/90 border-purple-700/50 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-900/30 rounded-lg">
              <Monitor className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <DialogTitle className="text-purple-200 text-xl font-bold">
                Sessões Ativas
              </DialogTitle>
              <DialogDescription className="text-purple-300 mt-1">
                Gerencie suas sessões em diferentes dispositivos
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
              <p className="text-purple-300 mt-2">Carregando sessões...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8">
              <Monitor className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-300">Nenhuma sessão encontrada</p>
            </div>
          ) : (
            <>
              {sessions.map((session) => (
                <div
                  key={session.sessionToken}
                  className={`p-4 rounded-lg border transition-colors ${
                    isCurrentSession(session)
                      ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/50"
                      : "bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-800/30 rounded-lg">
                        {getDeviceIcon(session)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-purple-200 font-medium">
                            {isCurrentSession(session)
                              ? "Sessão Atual"
                              : "Dispositivo"}
                          </p>
                          {isCurrentSession(session) && (
                            <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full">
                              Ativa
                            </span>
                          )}
                          {isExpired(session) && (
                            <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded-full">
                              Expirada
                            </span>
                          )}
                        </div>
                        <p className="text-purple-300 text-sm">
                          Criada em:{" "}
                          {formatDate(session.createdAt.toISOString())}
                        </p>
                        <p className="text-purple-300 text-sm">
                          Expira em: {formatDate(session.expires.toISOString())}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isCurrentSession(session) && !isExpired(session) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDeleteSession(session.sessionToken)
                          }
                          className="border-red-700/50 text-red-300 hover:bg-red-900/20"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {sessions.length > 1 && (
                <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-700/30">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-yellow-200 font-medium">
                      Encerrar Todas as Sessões
                    </h3>
                  </div>
                  <p className="text-yellow-300 text-sm mb-3">
                    Isso irá desconectar você de todos os dispositivos, exceto o
                    atual.
                  </p>
                  <CosmicButton
                    onClick={handleDeleteAllSessions}
                    disabled={isDeletingAll}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isDeletingAll ? "Encerrando..." : "Encerrar Todas"}
                  </CosmicButton>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-purple-700/50 text-purple-300 hover:bg-purple-900/20"
          >
            <X className="mr-2 h-4 w-4" />
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
