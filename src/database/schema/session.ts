import { pgEnum, pgTable, time, unique, uuid } from "drizzle-orm/pg-core"
import { activity } from "./activity"

/** Enumeração dos dias das semanas que uma atividade pode ser realizada. */
export const DAY_WEEK_ENUM = pgEnum("day_week_enum", ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"])

/** Enumeração dos horários de início das atividades, conforme padronização da faculdade. */
export const START_TIME_ENUM = pgEnum("start_time_enum", ["07:40", "09:30", "11:20", "13:10", "15:00", "16:50", "18:40"])
/** Enumeração dos horário de fim das aulas, conforme padronização da faculdade. */
export const END_TIME_ENUM = pgEnum("end_time_enum", ["09:20", "11:10", "13:00", "14:50", "16:40", "18:30", "20:20"])

/** Schema da tabela de horários das atividades. */
export const session = pgTable(
  "activity_session",
  {
    /** ID do horário da atividade. */
    id: uuid("session_id").primaryKey().defaultRandom(),
    /** Atividade extracurricular (FK). */
    activity: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    /** Dia da semana onde a atividade é realizada. */
    dayWeek: DAY_WEEK_ENUM("day_week").notNull(),
    /** Horário de início da atividade. */
    startTime: START_TIME_ENUM("start_time").notNull(),
    /** Horário de término da atividade. */
    endTime: END_TIME_ENUM("end_time").notNull(),
  },
  (table) => [
    // Constraint para evitar duplicação de horários para a mesma atividade no mesmo dia da semana
    unique().on(table.activity, table.dayWeek, table.startTime),
  ]
)
