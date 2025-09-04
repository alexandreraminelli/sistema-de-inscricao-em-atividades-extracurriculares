import { activity, schedule } from "@/database/schema"
import { getSchedulesByActivity } from "@/lib/actions/schedule"
import { UserRole } from "@/types/auth/UserRole"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import SessionInfo from "./SessionInfo"

/** Props de `ScheduleList`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole

  /** Chave para forçar atualização da lista. */
  refreshKey?: number
}
/** Lista de horários das atividades. */
export default function ScheduleList({ activity, userRole, refreshKey }: Props) {
  // Estado para armazenar os horários
  const [schedules, setSchedules] = useState<(typeof schedule.$inferSelect)[]>([])
  // Estado de transição para carregamento
  const [isPending, startTransition] = useTransition()

  // Obter horários da atividade ao carregar o componente
  useEffect(() => {
    fetchSchedules()
  }, [activity.id, refreshKey])

  /** Função para atualizar a lista de horários. */
  const handleRefresh = () => {
    startTransition(() => {
      fetchSchedules()
    })
  }

  /** Função para obter horários do banco de dados. */
  const fetchSchedules = async () => {
    try {
      const result = await getSchedulesByActivity(activity.id)
      if (result.success) {
        setSchedules(result.data)
      } else {
        toast.error("Erro ao carregar os horários", { description: result.message })
      }
    } catch (error) {
      console.error("Erro ao carregar os horários:", error)
      toast.error("Erro ao carregar os horários")
    }
  }

  return (
    <>
      {schedules.length === 0 ? (
        // Se não houver horários
        <p className="text-muted-foreground text-center">Ainda não há horários definidos.</p>
      ) : (
        schedules.map((s) => <SessionInfo key={s.id} activity={activity} schedule={s} userRole={userRole} updateSchedules={fetchSchedules} />)
      )}
    </>
  )
}
