"use server"

import { db } from "@/database/drizzle"
import { student, teacher, users } from "@/database/schema"
import { compare, hash } from "bcryptjs"
import { eq } from "drizzle-orm"

/** Return da função `signInWithCredentials()`. */
export type SignInResult =
  | {
      success: true
      user: { id: string; email: string; name: string }
    }
  | {
      success: false
      error: string
    }
/**
 * Função para realizar o login de um usuário com e-mail e senha.
 *
 * @param email E-mail do usuário.
 * @param password Senha do usuário.
 */
export async function signInWithCredentials({ email, password }: Pick<typeof users.$inferSelect, "email" | "password">): Promise<SignInResult> {
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

/** Retorno da função `signUp()`. */
export type SignUpResult =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }
/**
 * Função para realizar o cadastro de um novo usuário.
 *
 * @param params Campos do novo usuário.
 */
export async function signUp(
  params: typeof users.$inferInsert & Partial<typeof teacher.$inferInsert> & Partial<typeof student.$inferInsert> // params
): Promise<SignUpResult> {
  // Desestruturar os parâmetros
  const { name, email, password, role, isAdmin, enrollment_number } = params

  // Verificar se usuário já existe no banco de dados
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existingUser.length > 0) return { success: false, error: "E-mail já cadastrado!" }

  /** Hash da senha */
  const hashedPassword = await hash(password, 14)
  try {
    // Inserir novo usuário no banco de dados
    const [user] = await db.insert(users).values({ name, email, password: hashedPassword, role }).returning({ id: users.id })
    // Inserir usuário na tabela correspondente
    if (role === "teacher") await db.insert(teacher).values({ id: user.id, isAdmin: isAdmin ?? false })
    if (role === "student") await db.insert(student).values({ id: user.id, enrollment_number: enrollment_number || "N/A" })

    return { success: true }
  } catch (error) {
    return { success: false, error: `Erro ao cadastrar usuário: ${error}` }
  }
}
