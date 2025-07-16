import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

/** Schema da tabela de categorias das atividades. */
export const category = pgTable("category", {
  /** ID da categoria. */
  id: uuid("category_id").primaryKey().defaultRandom(),
  /** Nome da categoria. */
  name: varchar("name", { length: 100 }).notNull().unique(),
})
