"use server"

import { signIn } from "@/auth"
import { AuthCredentials } from "@/types/authCredentials"

/**
 * Função para realizar o login de um usuário com e-mail e senha.
 *
 * @param email E-mail do usuário.
 * @param password Senha do usuário.
 */
export async function signInWithCredentials({ email, password }: Pick<AuthCredentials, "email" | "password">) {
  try {
    // Iniciar sessão com as credenciais fornecidas
    /** Resultado da tentativa de login. Pode ser `error` ou `success`. */
    const result = await signIn("credentials", { email, password, redirect: false })

    // Se houver erro
    if (result?.error) return { success: false, error: result.error }
    // Se for bem-sucedido
    return { success: true }
  } catch (error) {
    // Se ocorrer um erro
    return { success: false, error: `Erro ao realizar login: ${error}` }
  }
}
