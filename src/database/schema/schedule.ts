import { pgEnum, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core"
import { activity } from "./activity"

/** Enumeração dos dias das semanas que uma atividade pode ser realizada. */
export const DAY_WEEK_ENUM = pgEnum("day_week_enum", ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"])

/** Enumeração dos horários das atividades, conforme padronização da faculdade. */
export const ACTIVITY_TIME_ENUM = pgEnum("session_time_enum", ["07:40 - 09:20", "09:30 - 11:10", "11:20 - 13:00", "13:10 - 14:50", "15:00 - 16:40", "16:50 - 18:30", "18:40 - 20:20"])

/** Schema da tabela de horários das atividades. */
export const schedule = pgTable(
  "activity_schedule",
  {
    /** ID do horário da atividade. */
    id: uuid("session_id").primaryKey().defaultRandom(),
    /** Atividade extracurricular (FK). */
    activity: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    /** Dia da semana em que a atividade é realizada. */
    dayWeek: DAY_WEEK_ENUM("day_week").notNull(),
    /** Horário de início e término da atividade. */
    time: ACTIVITY_TIME_ENUM("time").notNull(),
    /** Sala da atividade. */
    classroom: varchar("classroom", { length: 10 }),
  },
  (table) => [
    // Constraint para evitar duplicação de horários para a mesma atividade no mesmo dia da semana
    unique().on(table.activity, table.dayWeek, table.time),
  ]
)
