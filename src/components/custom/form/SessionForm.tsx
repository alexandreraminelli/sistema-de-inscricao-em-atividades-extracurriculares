import { session as sessionDb, activity as activityDb } from "@/database/schema"

/** Props de `SessionForm`. */
interface Props {
  /** Tipo de formulário (criação ou edição). */
  type: "create" | "edit"
  /** Atividade do horário. */
  activity: typeof activityDb.$inferSelect
  /** Horário a ser editado. */
  session?: typeof sessionDb.$inferSelect
}

/** Formulário de criação/edição de horários de atividades. */
export default function SessionForm({ type, activity, session }: Props) {
  // Componente
  return (
    <p>
      Formulário de horários de atividades. Tipo: {type}. Atividade: {activity.name}
    </p>
  )
}
