import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/actions/email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.RESEND_FROM_EMAIL!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Sincronizar com nossa tabela de usuários
      await prisma.user.upsert({
        where: { id: user.id },
        update: {
          email: user.email!,
          name: user.name,
          image: user.image,
        },
        create: {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image,
        },
      });

      // Enviar email de boas-vindas
      await sendWelcomeEmail({
        email: user.email!,
        name: user.name,
      });
    },
  },
});
