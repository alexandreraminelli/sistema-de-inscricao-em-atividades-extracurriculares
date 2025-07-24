/* Route Handler pro NextAuth . */

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const userResponse = await db.select().from(users).where(eq(users.email, credentials.email.toString())).limit(1)

        if (userResponse.length === 0) return null
        const user = userResponse[0]

        const isPasswordValid = await compare(credentials.password.toString(), user.password)

        if (!isPasswordValid) return null

        return {
          id: user.id.toString(),
          email: user.email.toString(),
          name: user.name.toString(),
          role: user.role as "student" | "teacher",
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role as "student" | "teacher"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as "student" | "teacher"
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
