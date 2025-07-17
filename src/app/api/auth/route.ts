import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Gerenciar sessão do usuário com JWT (JSON Web Token)
  session: {
    strategy: "jwt",
  },
  // Provedor de autenticação
  providers: [
    // E-mail e senha
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Se não houver e-mail ou senha, retorna null
        if (!credentials?.email || !credentials?.password) return null

        // Buscar usuário no banco de dados
        const userResponse = await db.select().from(users).where(eq(users.email, credentials.email.toString())).limit(1)

        // Se usuário não for encontrado
        if (userResponse.length === 0) return null
        const user = userResponse[0]

        // Verificar se senha corresponde
        const isPasswordValid = await compare(
          credentials.password.toString(), // senha no form
          user.password // senha no banco
        )
        if (!isPasswordValid) return null
        else
          return {
            /* Senha correta: retornar usuário */
            id: user.id.toString(),
            email: user.email.toString(),
            name: user.name.toString(),
          } as User
      },
    }),
  ],
})
