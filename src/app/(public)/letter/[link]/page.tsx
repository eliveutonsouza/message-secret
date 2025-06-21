import { notFound } from "next/navigation";
import { LetterView } from "./letter-view";
import { PasswordScreen } from "./password-screen";
import { AccessDeniedScreen } from "./access-denied-screen";
import { WaitingScreen } from "./waiting-screen";
import { LetterService } from "@/lib/services/letter-service";
import { SecurityService } from "@/lib/services/security-service";
import { headers } from "next/headers";

interface LetterPageProps {
  params: Promise<{ link: string }>;
  searchParams: Promise<{ password?: string | null }>;
}

export default async function LetterPage({
  params,
  searchParams,
}: LetterPageProps) {
  const { link } = await params;
  const { password } = await searchParams;
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  const letter = await LetterService.getLetterByUniqueLink(link);

  if (!letter) {
    notFound();
  }

  // Verificar se pode acessar a carta
  const accessCheck = await SecurityService.canAccessLetter(
    link,
    password ? password : undefined
  );

  if (!accessCheck.canAccess) {
    // Log da tentativa de acesso
    await SecurityService.logAccessAttempt(
      letter.id,
      ip,
      userAgent,
      false,
      accessCheck.reason
    );

    if (accessCheck.requiresPassword) {
      // Redirecionar para tela de senha
      return <PasswordScreen letter={letter} />;
    }

    // Se a carta ainda não foi liberada, mostrar tela de espera
    if (accessCheck.reason === "Carta ainda não foi liberada") {
      return <WaitingScreen letter={letter} />;
    }

    // Mostrar erro de acesso negado para outros casos
    return (
      <AccessDeniedScreen reason={accessCheck.reason || "Acesso negado"} />
    );
  }

  // Log do acesso bem-sucedido
  await SecurityService.logAccessAttempt(letter.id, ip, userAgent, true);

  // Incrementar contador de visualizações
  await SecurityService.incrementViewCount(letter.id as string);

  // Marcar como autorizado na sessão
  await SecurityService.authorizeInSession(letter.id as string);

  return <LetterView letter={letter} />;
}
