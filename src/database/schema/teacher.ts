import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { users } from "./users"

/** Schema da tabela de professores. */
export const teacher = pgTable("teacher", {
  /** ID do usuário (FK). */
  id: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  /** Texto de descrição do professor. */
  description: text("description").notNull().default("Sem descrição"),
  /** Se o professor possui permissão de administrador para gerenciar atividades e inscrições. */
  isAdmin: boolean("is_admin").default(false),
})
