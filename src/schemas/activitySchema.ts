import z from "zod"

/** Zod schema para atividades extracurriculares. */
export const activitySchema = z.object({
  /** Nome da atividade extracurricular. */
  name: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.").max(100, "O nome pode ter no máximo 100 caracteres."),
  /** Categoria da atividade. */
  category: z.uuid("Selecione uma categoria."),
  /** Descrição da atividade. */
  description: z.string().optional(),
  /** Número máximo de participantes por turma. */
  maxParticipants: z
    .number({
      message: "Deve ser um número válido.",
    })
    .min(15, "As turmas devem ter mais de 15 alunos.")
    .max(40, "As turmas não podem ter mais de 40 alunos."),
  /** Professor responsável por aplicar a atividade. */
  teacher: z.uuid("Selecione um professor."),
  /** Imagem de capa da atividade. */
  coverImg: z.string(),
})
