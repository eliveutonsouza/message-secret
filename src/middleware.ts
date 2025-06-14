import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Log para depuração
  console.log("req.auth:", req.auth);

  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ["/dashboard", "/create-letter", "/edit-letter"];

  // Verificar se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se é uma rota protegida e o usuário não está autenticado
  if (isProtectedRoute && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se o usuário está autenticado e tenta acessar login, redirecionar para dashboard
  if (pathname === "/login" && req.auth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
