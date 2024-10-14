
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import { apiBaseUrl } from "next-auth/client/_utils";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomeSession = {
  user?: CustomUser;
  expires: string;
};

export type CustomUser = {
  id?: string | null;
  // name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await axios.post(
            `${apiBaseUrl}/auth/login`,
            credentials
          );
          const user = data?.data?.user;
          if (user) {
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: CustomeSession;
      user: CustomUser;
      token: JWT;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
