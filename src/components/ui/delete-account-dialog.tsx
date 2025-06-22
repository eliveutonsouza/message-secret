"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { deleteUserAction } from "@/lib/actions/user-actions";
import { signOut } from "next-auth/react";

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function DeleteAccountDialog({
  isOpen,
  onClose,
  userEmail,
}: DeleteAccountDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationEmail !== userEmail) {
      toast.error("Email não confere");
      return;
    }

    if (confirmationText !== "EXCLUIR CONTA") {
      toast.error("Texto de confirmação incorreto");
      return;
    }

    try {
      setIsDeleting(true);
      const result = await deleteUserAction();

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Conta excluída com sucesso");
        await signOut({ callbackUrl: "/" });
      }
    } catch {
      toast.error("Erro ao excluir conta");
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  const handleClose = () => {
    setConfirmationEmail("");
    setConfirmationText("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-red-950/90 via-purple-950/90 to-pink-950/90 border-red-700/50 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-red-200 text-xl font-bold">
                Excluir Conta
              </DialogTitle>
              <DialogDescription className="text-red-300 mt-1">
                Esta ação é irreversível
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-700/30">
            <p className="text-red-200 text-sm">
              <strong>Atenção:</strong> Ao excluir sua conta, você perderá
              permanentemente:
            </p>
            <ul className="text-red-300 text-sm mt-2 space-y-1">
              <li>• Todas as suas cartas cósmicas</li>
              <li>• Histórico de pagamentos</li>
              <li>• Configurações e preferências</li>
              <li>• Acesso à plataforma</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div>
              <Label
                htmlFor="email-confirmation"
                className="text-red-200 text-sm"
              >
                Digite seu email para confirmar
              </Label>
              <Input
                id="email-confirmation"
                type="email"
                value={confirmationEmail}
                onChange={(e) => setConfirmationEmail(e.target.value)}
                placeholder={userEmail}
                className="bg-red-950/30 border-red-700/50 text-white placeholder:text-red-400 focus:border-red-500 focus:ring-red-500/20"
              />
            </div>

            <div>
              <Label
                htmlFor="text-confirmation"
                className="text-red-200 text-sm"
              >
                Digite &ldquo;EXCLUIR CONTA&rdquo; para confirmar
              </Label>
              <Input
                id="text-confirmation"
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="EXCLUIR CONTA"
                className="bg-red-950/30 border-red-700/50 text-white placeholder:text-red-400 focus:border-red-500 focus:ring-red-500/20"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
            className="border-red-700/50 text-red-300 hover:bg-red-900/20"
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <CosmicButton
            onClick={handleDelete}
            disabled={
              isDeleting ||
              confirmationEmail !== userEmail ||
              confirmationText !== "EXCLUIR CONTA"
            }
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Excluindo..." : "Excluir Conta"}
          </CosmicButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
