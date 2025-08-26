import { schedule } from "@/database/schema"
import z from "zod"

/** Zod schema para horário de atividades. */
export const scheduleSchema = z.object({
  /** ID da atividade. */
  activity: z.uuid(),
  /** Dia da semana. */
  dayWeek: z.enum(schedule.dayWeek.enumValues, "Selecione um dia da semana."),
  /** Horário da atividade. */
  time: z.enum(schedule.time.enumValues, "Selecione um horário."),
  /** Sala da atividade. */
  classroom: z.string().max(10, "A sala deve ter no máximo 10 caracteres.").optional(),
})
