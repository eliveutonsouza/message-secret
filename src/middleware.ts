import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ["/dashboard", "/create-letter", "/edit-letter"];

  // Verifica se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Obtém todos os cookies da requisição
  const allCookies = req.cookies.getAll();

  // Checa se existe algum cookie de sessão do NextAuth/Auth.js
  const hasSessionCookie = allCookies.some(
    (cookie) =>
      cookie.name.startsWith("authjs.session-token") ||
      cookie.name.startsWith("next-auth.session-token")
  );

  // Se for rota protegida e não houver cookie de sessão, redireciona para login
  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário está autenticado e tenta acessar login, redireciona para dashboard
  if (pathname === "/login" && hasSessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Permite a requisição seguir normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
