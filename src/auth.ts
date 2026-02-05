import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyUser, getUserById } from "@/lib/queries";

console.log("[AUTH] NextAuth module loading...");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Uživatelské jméno", type: "text" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH] Authorize attempt for:", credentials?.username);
        if (!credentials?.username || !credentials?.password) {
          console.log("[AUTH] Missing credentials");
          return null;
        }

        const user = verifyUser(
          credentials.username as string,
          credentials.password as string,
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
