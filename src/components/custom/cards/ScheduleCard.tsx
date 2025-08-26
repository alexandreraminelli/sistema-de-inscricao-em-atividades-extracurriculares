"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { db } from "@/database/drizzle"
import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { eq } from "drizzle-orm"
import { CalendarPlusIcon, CalendarRangeIcon, ChevronDownIcon, PencilIcon, RefreshCwIcon } from "lucide-react"
import DeleteScheduleButton from "../button/deleteButton/DeleteScheduleButton"
import ScheduleForm from "../form/ScheduleForm"
import { useEffect, useState, useTransition } from "react"
import { getSchedulesByActivity } from "@/lib/actions/schedule"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole
}

/** Card de horário das atividades. */
export default function SessionCard({ activity, userRole }: Props) {
  // Estado e função de atualização
  const [sessions, setSessions] = useState<(typeof schedule.$inferSelect)[]>([])
  const [isPending, startTransition] = useTransition()

  /** Função para obter horários do banco de dados. */
  const fetchSchedules = async () => {
    try {
      const result = await getSchedulesByActivity(activity.id)
      if (result.success) {
        setSessions(result.data)
      } else {
        toast.error("Erro ao carregar os horários", { description: result.message })
      }
    } catch (error) {
      toast.error("Erro ao carregar os horários")
    }
  }

  // Obter horários da atividade ao carregar o componente
  useEffect(() => {
    fetchSchedules()
  }, [activity.id])

  /** Função para atualizar a lista de horários. */
  const handleRefresh = () => {
    startTransition(() => {
      fetchSchedules()
    })
  }

  return (
    <Card className="p-6 md:px-4 items-center">
      <Collapsible className="w-full">
        {/* Botão collapsible */}
        <CollapsibleTrigger className="w-full [&[data-state=open]_svg]:rotate-180">
          <CardHeader className="p-0 m-0 w-full flex flex-row justify-between items-center">
            <CalendarRangeIcon className="!rotate-0" />
            <CardTitle className="text-center">Horários</CardTitle>
            <ChevronDownIcon className="transition-all items-end" />
          </CardHeader>
        </CollapsibleTrigger>

        {/* Conteúdo do collapsible */}
        <CollapsibleContent>
          <CardContent className="p-0 m-0 mt-4 w-full md:max-w-48 lg:max-w-96 flex max-md:flex-row max-md:flex-wrap md:flex-col items-center justify-center gap-2 *:flex-1">
            {/* Lista de horários */}
            {sessions.length === 0 ? (
              // Se não houver horários
              <p className="text-muted-foreground text-center">Ainda não há horários definidos.</p>
            ) : (
              sessions.map((s) => <SessionInfo key={s.id} activity={activity} schedule={s} userRole={userRole} updateSchedules={fetchSchedules} />)
            )}
          </CardContent>
          <CardFooter className="p-0 m-0 mt-4 gap-2.5 w-full max-md:flex-wrap md:flex-col *:flex-1 md:*:w-full">
            {/* Botão de atualizar horários */}
            <Button variant="secondary" onClick={handleRefresh} disabled={isPending}>
              <RefreshCwIcon /> Atualizar Horários
            </Button>
            {/* Botões dos professores */}
            {userRole === "teacher" && (
              <Dialog>
                <DialogTrigger asChild>
                  {/* Botão de adicionar horário */}
                  <Button variant="default">
                    <CalendarPlusIcon /> Adicionar Horário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Horário</DialogTitle>
                  </DialogHeader>
                  {/* Form de adicionar horário */}
                  <ScheduleForm type="create" activity={activity} inDialog updateSchedules={fetchSchedules} />
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

/** Props de `SessionInfo`. */
interface SessionInfoProps {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
  userRole: UserRole

  /** Função para atualizar os horários. */
  updateSchedules?: () => void
}
/** Card com informações de um horário. */
function SessionInfo({ activity, schedule, userRole, updateSchedules }: SessionInfoProps) {
  return (
    <Card
      className="p-4 md:w-full gap-y-2 gap-x-4
      flex-row max-md:flex-wrap max-md:*:flex-1 max-md:*:min-w-36 max-md:items-center justify-around
      md:flex-col"
    >
      <CardHeader className="p-0">
        <CardTitle className="text-nowrap text-center flex flex-col gap-2">
          {/* Dia e horário */}
          <span>{schedule.dayWeek}</span>
          <span>{schedule.time}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-center">
        {/* Sala */}
        <p>Sala: {schedule.classroom || "N/A"}</p>
        {/* Quantidade de inscritos */}
        <p>
          Inscritos: {"N"}/{activity.maxParticipants}
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-4 md:mt-1.5">
        {/* Botão para professores */}
        {userRole === "teacher" && (
          <>
            {/* Botão de editar */}
            <Tooltip>
              <TooltipTrigger>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <PencilIcon /> <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Horário</DialogTitle>
                    </DialogHeader>
                    {/* Form de adicionar horário */}
                    <ScheduleForm type="edit" activity={activity} schedule={schedule} inDialog updateSchedules={updateSchedules} />
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>

            {/* Botão de excluir */}
            <Tooltip>
              <TooltipTrigger>
                <DeleteScheduleButton activity={activity} schedule={schedule} updateSchedules={updateSchedules} />
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
