import NextAuth from "next-auth";
import type { NextAuthConfig, Session, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getResendProvider } from "@/lib/auth/resend-provider";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    } & Partial<User>;
  }
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [getResendProvider()],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
