import { session } from "@/database/schema"

/** Props de `SessionForm`. */
interface Props {
  /** Tipo de formulário (criação ou edição). */
  type: "create" | "edit"
  /** Horário a ser editado. */
  session?: typeof session.$inferSelect
}

/** Formulário de criação/edição de horários de atividades. */
export default function SessionForm({ type, session }: Props) {
  // Componente
  return <p>Formulário de horários de atividades. Tipo: {type}</p>
}
