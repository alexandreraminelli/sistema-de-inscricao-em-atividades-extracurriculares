import { session } from "@/database/schema"
import z from "zod"

/** Zod schema para horário de atividades. */
export const sessionSchema = z.object({
  /** ID da atividade. */
  activity: z.uuid(),
  /** Dia da semana. */
  dayWeek: z.enum(session.dayWeek.enumValues, "Selecione um dia da semana."),
  /** Horário da atividade. */
  time: z.enum(session.time.enumValues, "Selecione um horário."),
})
