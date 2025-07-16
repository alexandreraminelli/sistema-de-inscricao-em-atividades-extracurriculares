import { pgEnum, pgTable, primaryKey, time, uuid } from "drizzle-orm/pg-core"
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
    /** Atividade extracurricular (FK). */
    activity: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    /** Dia da semana onde a atividade é realizada. */
    dayWeek: DAY_WEEK_ENUM("day_week").notNull(),
    /** Horário de início da atividade. */
    startTime: time("start_time").notNull(),
  },
  // PK composta
  (table) => [primaryKey({ columns: [table.activity, table.dayWeek, table.startTime] })]
)
