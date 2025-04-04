import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // Credentials({
    //   name: "Credentials",
    // }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
