import bcrypt from 'bcrypt';
import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { isValidPassword } from '../../../utils/verifyData/userData';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "Insira seu email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials.email) return null;

        if (!isValidPassword(credentials.password)) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          select: {
            id: true,
            email: true,
            image: true,
            name: true,
            password_hash: true,
          }
        })

        if (!user) return null;
        
        const correctPass: boolean = await bcrypt.compare(credentials.password, user.password_hash as string)

        if (!correctPass) return null

        console.log("dasd", user);
        return {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name
        };
        }
      }),
  ],
  secret: process.env.JWT_SECRET
};

export default NextAuth(authOptions);
