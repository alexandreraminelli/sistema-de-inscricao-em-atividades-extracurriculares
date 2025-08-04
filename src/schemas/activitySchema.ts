import z from "zod"

/** Zod schema para atividades extracurriculares. */
export const activitySchema = z.object({
  /** Nome da atividade extracurricular. */
  name: z.string().min(5).max(100),
  /** Categoria da atividade. */
  category: z.uuid("Selecione uma categoria."),
  /** Descrição da atividade. */
  description: z.string().optional(),
  /** Professor responsável por aplicar a atividade. */
  teacher: z.uuid("Selecione um professor."),
  /** Imagem de capa da atividade. */
  coverImg: z.string(),
})
