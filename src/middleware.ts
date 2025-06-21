import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Cache simples para rate limiting
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(
  ip: string,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const key = `rate_limit:${ip}`;

  const current = rateLimitCache.get(key);

  if (!current || now > current.resetTime) {
    rateLimitCache.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (current.count >= limit) {
    return true;
  }

  current.count++;
  return false;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proteção para rotas de cartas públicas
  if (pathname.startsWith("/letter/")) {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting para tentativas de acesso
    if (isRateLimited(ip, 20, 60000)) {
      // 20 tentativas por minuto
      return new NextResponse(
        JSON.stringify({
          error:
            "Muitas tentativas de acesso. Tente novamente em alguns minutos.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verificar se é uma tentativa de força bruta (muitos links únicos em sequência)
    const linkPattern = /\/letter\/([a-zA-Z0-9-_]+)/;
    const match = pathname.match(linkPattern);

    if (match) {
      const link = match[1];

      // Verificar se o link tem formato válido (pelo menos 8 caracteres)
      if (link.length < 8) {
        return new NextResponse(JSON.stringify({ error: "Link inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  }

  // Proteção para rotas privadas
  if (pathname.startsWith("/(private)")) {
    const token = getToken({ req: req });

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
