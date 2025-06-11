import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/cosmic-background";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartas Cósmicas - Mensagens que transcendem o tempo",
  description:
    "Crie cartas misteriosas que só podem ser lidas na data escolhida. Envie amor através do espaço-tempo.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>
          <CosmicBackground />
          <div className="relative z-10 min-h-screen">{children}</div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
