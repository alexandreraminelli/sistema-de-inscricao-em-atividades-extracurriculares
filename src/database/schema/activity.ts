import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core"
import { teacher } from "./teacher"
import { category } from "./category"

/** Schema da tabela de atividades extracurriculares. */
export const activity = pgTable("extracurricular_activity", {
  /** ID da atividade. */
  id: uuid("activity_id").primaryKey(),
  /** Nome da atividade extracurricular. */
  name: varchar("name", { length: 100 }).notNull().unique(),
  /** Categoria da atividade. */
  category: uuid("category_id")
    .notNull()
    .references(() => category.id),
  /** Texto de descrição da atividade. */
  description: text("description").notNull().default("Sem descrição"),
  /** Professor responsável pela atividade. */
  teacher: uuid("teacher_id")
    .notNull()
    .references(() => teacher.id),
  /** Imagem de capa da atividade extracurricular. */
  coverImg: varchar("cover_img", { length: 500 }),
})
