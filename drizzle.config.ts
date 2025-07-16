import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" }) // carregar variáveis de ambiente

// Configurações do Drizzle ORM
export default defineConfig({
  // Caminho para o schema do banco de dados
  schema: "./src/database/schema.ts",
  // Caminho para as migrações geradas
  out: "./migrations",
  // Dialeto do banco de dados
  dialect: "postgresql",
  // Credenciais do banco de dados
  dbCredentials: {
    url: process.env.DATABASE_URL!, // obter URL no .env
  },
})
