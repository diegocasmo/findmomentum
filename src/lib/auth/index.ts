import NextAuth from "next-auth";
import type { NextAuthConfig, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { findOrCreateDefaultTeam } from "@/lib/services/find-or-create-default-team";

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
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        const verificationToken =
          await prisma.verificationToken.findFirstOrThrow({
            where: {
              identifier: credentials.email,
              token: credentials.otp,
              expires: { gt: new Date() },
            },
          });

        if (!verificationToken) return null;

        // Delete the used token
        await prisma.verificationToken.delete({
          where: { id: verificationToken.id },
        });

        // Find or create the user
        let user = await prisma.user.findFirstOrThrow({
          where: { email: credentials.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: { email: verificationToken.identifier },
          });
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id && user.email) {
        await findOrCreateDefaultTeam(user.id);
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
