import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { ClassNameValue } from "tailwind-merge"
import ScheduleInfo from "./ScheduleInfo"

/** Props de `ScheduleList`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedules: (typeof schedule.$inferSelect)[]
  userRole: UserRole
  classNameInfo?: ClassNameValue

  /** Chave para forçar atualização da lista. */
  refreshKey?: number
}
/** Lista de horários das atividades. */
export default function ScheduleList({ activity, userRole, schedules, refreshKey, classNameInfo }: Props) {
  return (
    <>
      {schedules.length === 0 ? (
        // Se não houver horários
        <p className="text-muted-foreground text-center">Ainda não há horários definidos.</p>
      ) : (
        schedules.map((s) => <ScheduleInfo key={s.id} activity={activity} schedule={s} userRole={userRole} className={classNameInfo} />)
      )}
    </>
  )
}
