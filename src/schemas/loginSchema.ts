import config from "@/lib/config"
import { z } from "zod"

/** Zod Schema para o formulário de login. */
export const loginSchema = z.object({
  /** Nome do usuário. */
  name: z.string().min(2, "Por favor, insira um nome completo."),
  /** E-mail acadêmico do usuário. */
  email: z.email("Por favor, insira um e-mail acadêmico válido.").refine((email) => email.endsWith(config.emailDomain), `Utilize o mesmo e-mail do portal acadêmico (${config.emailDomain}).`),
  /** Senha do usuário. */
  password: z.string("Por favor, insira sua senha.").min(8, "A senha tem que ter pelo menos 8 caracteres."),
})
