import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "@/components/cosmic-background";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Cartas Cósmicas - Mensagens que transcendem o tempo",
    template: "%s | Cartas Cósmicas",
  },
  description:
    "Crie cartas misteriosas que só podem ser lidas na data escolhida. Envie amor através do espaço-tempo com nossa plataforma única de mensagens cósmicas.",
  keywords: [
    "cartas cósmicas",
    "mensagens misteriosas",
    "amor",
    "romance",
    "surpresa",
    "data especial",
    "mensagens temporizadas",
    "cartas de amor",
    "presente romântico",
    "declaração de amor",
  ],
  authors: [{ name: "Cartas Cósmicas" }],
  creator: "Cartas Cósmicas",
  publisher: "Cartas Cósmicas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Cartas Cósmicas - Mensagens que transcendem o tempo",
    description:
      "Crie cartas misteriosas que só podem ser lidas na data escolhida. Envie amor através do espaço-tempo.",
    siteName: "Cartas Cósmicas",
    images: [
      {
        url: "/logo.svg",
        width: 64,
        height: 64,
        alt: "Cartas Cósmicas Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartas Cósmicas - Mensagens que transcendem o tempo",
    description:
      "Crie cartas misteriosas que só podem ser lidas na data escolhida. Envie amor através do espaço-tempo.",
    images: ["/logo.svg"],
    creator: "@cartascosmicas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "lifestyle",
  classification: "Romance & Comunicação",
  other: {
    "theme-color": "#8b5cf6",
    "color-scheme": "dark",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Cartas Cósmicas",
    "application-name": "Cartas Cósmicas",
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="dark" />
      </head>
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
