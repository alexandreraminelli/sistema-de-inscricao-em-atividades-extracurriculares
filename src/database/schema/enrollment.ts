import { pgTable, uuid } from "drizzle-orm/pg-core"
import { users } from "./users"
import { session } from "./session"

/** Schema da tabela de inscrição dos estudantes em atividades. */
export const enrollment = pgTable("activity_enrollment", {
  /** ID da inscrição. */
  id: uuid("enrollment_id").primaryKey().defaultRandom(),
  /** ID do estudante (FK). */
  student: uuid("student_id")
    .notNull()
    .references(() => users.id),
  /** ID da sessão de atividade (FK). */
  session: uuid("session_id")
    .notNull()
    .references(() => session.id),
})
