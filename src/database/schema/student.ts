import { pgTable, uuid, char } from "drizzle-orm/pg-core"
import { users } from "./users"

/** Schema da tabela de estudantes. */
export const student = pgTable("student", {
  /** ID do usuário (FK). */
  id: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  /** RA (registro de matrícula) do estudante. Formato: "YY.XXXXX-X" */
  enrollment_number: char("enrollment_number", { length: 10 }),
})
