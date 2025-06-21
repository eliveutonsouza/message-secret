"use client";

import { Lock, Clock, Eye, Calendar } from "lucide-react";
import { CosmicButton } from "@/components/ui/cosmic-button";
import {
  CosmicCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cosmic-card";
import Link from "next/link";

interface AccessDeniedScreenProps {
  reason: string;
}

export function AccessDeniedScreen({ reason }: AccessDeniedScreenProps) {
  const getIcon = () => {
    switch (reason) {
      case "Carta ainda não foi liberada":
        return <Clock className="h-16 w-16 text-purple-400" />;
      case "Link expirado":
        return <Calendar className="h-16 w-16 text-red-400" />;
      case "Limite de visualizações atingido":
        return <Eye className="h-16 w-16 text-orange-400" />;
      default:
        return <Lock className="h-16 w-16 text-purple-400" />;
    }
  };

  const getTitle = () => {
    switch (reason) {
      case "Carta ainda não foi liberada":
        return "Aguardando Liberação";
      case "Link expirado":
        return "Link Expirado";
      case "Limite de visualizações atingido":
        return "Limite Atingido";
      case "Carta não está ativa":
        return "Carta Não Ativa";
      case "Pagamento pendente":
        return "Pagamento Pendente";
      default:
        return "Acesso Negado";
    }
  };

  const getDescription = () => {
    switch (reason) {
      case "Carta ainda não foi liberada":
        return "Esta carta ainda não foi liberada pelo remetente. Aguarde até a data de liberação.";
      case "Link expirado":
        return "O link desta carta expirou e não pode mais ser acessado.";
      case "Limite de visualizações atingido":
        return "Esta carta atingiu o limite máximo de visualizações definido pelo remetente.";
      case "Carta não está ativa":
        return "Esta carta não está ativa no momento.";
      case "Pagamento pendente":
        return "Esta carta ainda não foi ativada. O pagamento pode estar pendente.";
      default:
        return reason;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <CosmicCard className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getIcon()}</div>
          <CardTitle className="text-2xl cosmic-text-glow">
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <p className="text-purple-300">{getDescription()}</p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <CosmicButton className="w-full">Criar Minha Carta</CosmicButton>
            </Link>

            <div className="text-center">
              <p className="text-xs text-purple-400">
                Entre em contato com o remetente se acredita que isso é um erro
              </p>
            </div>
          </div>
        </CardContent>
      </CosmicCard>
    </div>
  );
}
