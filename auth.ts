import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./lib/db";
import { getUserById } from "@/data/user";

export type ExtendedUser = DefaultSession["user"] & { role: UserRole };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login", // redirects here if something went wrong during signin. like using the same email in github and google
    error: "/auth/error",
  },
  events: {
    // events are async funcs that do not return a response, tyeu are useful for audit logs/reporting or handle any other side effects
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    // async funcs to control what happens when an action is performed. better than do the logic in the actions
    // good for tokens and for sessions
    async signIn({ user, account }) {
      // Allow OAUth without email verification

      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id as string);

      // prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      //Todo: Add 2FA

      return true;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; //defined the field id

        session.user.role = token.role as UserRole;
        console.log(session);
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token; // not logged in

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token; //not logged in
      token.role = existingUser.role;

      //console.log(token)

      return token;
    },
  },
  adapter: PrismaAdapter(db),

  session: { strategy: "jwt" },

  ...authConfig,
});
