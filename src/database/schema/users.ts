import { char, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core"

/** Enumeration dos papéis do usuário no sistema.
 *
 * Papéis possíveis:
 * - `student` (estudante)
 * - `teacher` (professor).
 */
export const ROLE_ENUM = pgEnum("role_enum", ["student", "teacher"])

/** Schema da tabela de usuários. */
export const users = pgTable("users", {
  /** ID do usuário. */
  id: uuid("user_id").primaryKey().defaultRandom(),
  /** E-mail do usuário. */
  email: varchar("email", { length: 100 }).notNull().unique(),
  /** Nome do usuário. */
  name: varchar("name", { length: 255 }).notNull(),
  /** Senha do usuário. Criptografa com Bcrypt. */
  password: char("password", { length: 60 }).notNull(),
  /** Papel do usuário no sistema (estudante ou professor). */
  role: ROLE_ENUM("role").notNull(),
})
