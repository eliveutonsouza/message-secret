import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { cookies } from "next/headers";
import { createHash } from "crypto";

export class SecurityService {
  // Verificar se uma carta pode ser acessada
  static async canAccessLetter(uniqueLink: string, password?: string | null) {
    const letter = await prisma.letter.findUnique({
      where: { uniqueLink },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        accessPassword: true,
        maxViews: true,
        viewCount: true,
        expiresAt: true,
        isPublic: true,
        releaseDate: true,
      },
    });

    if (!letter) {
      return { canAccess: false, reason: "Carta não encontrada" };
    }

    // Verificar se a carta está ativa
    if (letter.status !== "ACTIVE") {
      return { canAccess: false, reason: "Carta não está ativa" };
    }

    // Verificar se o pagamento foi confirmado
    if (letter.paymentStatus !== "PAID") {
      return { canAccess: false, reason: "Pagamento pendente" };
    }

    // Verificar se a carta expirou
    if (letter.expiresAt && new Date() > letter.expiresAt) {
      return { canAccess: false, reason: "Link expirado" };
    }

    // Verificar se atingiu o limite de visualizações
    if (letter.maxViews && letter.viewCount >= letter.maxViews) {
      return { canAccess: false, reason: "Limite de visualizações atingido" };
    }

    // Verificar se a data de liberação chegou
    if (new Date() < letter.releaseDate) {
      return { canAccess: false, reason: "Carta ainda não foi liberada" };
    }

    // Se tem senha, verificar
    if (letter.accessPassword) {
      if (!password) {
        return {
          canAccess: false,
          reason: "Senha necessária",
          requiresPassword: true,
        };
      }

      const isValidPassword = await compare(password, letter.accessPassword);
      if (!isValidPassword) {
        return { canAccess: false, reason: "Senha incorreta" };
      }
    }

    return { canAccess: true };
  }

  // Incrementar contador de visualizações
  static async incrementViewCount(letterId: string | undefined) {
    if (!letterId) return null;

    return await prisma.letter.update({
      where: { id: letterId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  // Gerar hash de senha
  static async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  // Verificar se o acesso já foi autorizado nesta sessão
  static async isAuthorizedInSession(letterId: string): Promise<boolean> {
    const cookieStore = await cookies();
    const authorizedLetters = cookieStore.get("authorized_letters")?.value;

    if (!authorizedLetters) return false;

    try {
      const authorizedIds = JSON.parse(authorizedLetters);
      return authorizedIds.includes(letterId);
    } catch {
      return false;
    }
  }

  // Marcar carta como autorizada na sessão
  static async authorizeInSession(letterId: string | undefined) {
    if (!letterId) return;

    const cookieStore = await cookies();
    const authorizedLetters = cookieStore.get("authorized_letters")?.value;

    let authorizedIds: string[] = [];
    if (authorizedLetters) {
      try {
        authorizedIds = JSON.parse(authorizedLetters);
      } catch {
        authorizedIds = [];
      }
    }

    if (!authorizedIds.includes(letterId)) {
      authorizedIds.push(letterId);
    }

    // Definir cookie que expira em 24 horas
    cookieStore.set("authorized_letters", JSON.stringify(authorizedIds), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 horas
    });
  }

  // Gerar token de acesso temporário
  static generateAccessToken(
    letterId: string,
    expiresIn: number = 3600
  ): string {
    const timestamp = Date.now();
    const data = `${letterId}:${timestamp}:${expiresIn}`;
    return createHash("sha256").update(data).digest("hex");
  }

  // Verificar se o IP já acessou muitas cartas (proteção contra scraping)
  static async checkIPAccessLimit(): Promise<boolean> {
    // Implementação simples - em produção, usar Redis ou similar
    // Aqui você implementaria a lógica com Redis ou banco de dados
    // Por enquanto, retorna true (permitir acesso)
    return true;
  }

  // Log de tentativa de acesso
  static async logAccessAttempt(
    letterId: string | undefined,
    ip: string,
    userAgent: string,
    success: boolean,
    reason?: string
  ) {
    // Em produção, salvar em banco de dados ou sistema de logs
    console.log(
      `Access attempt: ${letterId || "unknown"} from ${ip} - ${success ? "SUCCESS" : "FAILED"} - ${reason || ""}`
    );
  }
}
