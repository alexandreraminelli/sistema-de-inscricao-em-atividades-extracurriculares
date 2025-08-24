import { session } from "@/database/schema"
import z from "zod"

/** Zod schema para horário de atividades. */
export const sessionSchema = z.object({
  /** ID da atividade. */
  activity: z.uuid(),
  /** Dia da semana. */
  dayWeek: z.enum(session.dayWeek.enumValues, "Selecione um dia da semana."),
  /** Horário de início da atividade. */
  startTime: z.enum(session.startTime.enumValues, "Selecione um horário de início."),
  /** Horário de término da atividade */
  endTime: z.enum(session.endTime.enumValues, "Selecione um horário de término."),
})
