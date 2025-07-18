/** Tipagem das credenciais de autenticação. */
export interface AuthCredentials {
  /** Nome do usuário. */
  name: string
  /** E-mail do usuário. */
  email: string
  /** Senha do usuário. */
  password: string
  /** Papel do usuário. */
  role: "student" | "teacher"
}
