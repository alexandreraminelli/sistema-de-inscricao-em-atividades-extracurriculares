// Conexão do Drizzle com o banco de dados do Neon

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import config from "@/lib/config"

/** Instância do cliente Neon configurada com a URL do banco de dados. */
const neonClient = neon(config.env.database.url)

/** Instância do Drizzle configurada com o cliente Neon. */
export const db = drizzle({ client: neonClient })
