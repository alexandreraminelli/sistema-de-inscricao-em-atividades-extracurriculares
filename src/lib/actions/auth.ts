"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { AuthCredentials } from "@/types/auth/authCredentials"

/**
 * Função para realizar o login de um usuário com e-mail e senha.
 *
 * @param email E-mail do usuário.
 * @param password Senha do usuário.
 */
export async function signInWithCredentials({ email, password }: Pick<AuthCredentials, "email" | "password">) {
  try {
    // Validar credenciais diretamente no banco de dados
    if (!email || !password) {
      return { success: false, error: "E-mail e senha são obrigatórios" }
    }

    // Buscar usuário no banco de dados
    const userResponse = await db.select().from(users).where(eq(users.email, email)).limit(1)

    // Se usuário não for encontrado
    if (userResponse.length === 0) {
      return { success: false, error: "Usuário não encontrado" }
    }

    const user = userResponse[0]

    // Verificar se senha corresponde
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Senha incorreta" }
    }

    // Credenciais válidas
    return { success: true, user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    // Se ocorrer um erro
    return { success: false, error: `Erro ao realizar login: ${error}` }
  }
}
