/**
 * Configurações do projeto.
 */
const config = {
  /** Variáveis de ambiente. */
  env: {
    /** Variáveis de ambiente para o banco de dados. */
    database: {
      /** URL de conexão com o banco de dados. */
      url: process.env.DATABASE_URL!,
    },
    /** Variáveis de ambiente pro NextAuth. */
    nextAuth: {
      secret: process.env.AUTH_SECRET!,
    },
  },
  /** Domínio de e-mail acadêmico. */
  emailDomain: "@loremipsum.edu.br",
}
export default config
