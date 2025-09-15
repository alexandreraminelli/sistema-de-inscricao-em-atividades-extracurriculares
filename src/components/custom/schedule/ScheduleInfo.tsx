import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { PencilIcon } from "lucide-react"
import DeleteScheduleButton from "../button/deleteButton/DeleteScheduleButton"
import ScheduleForm from "../form/ScheduleForm"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import EnrollmentButton from "../enrollment/EnrollmentButton"
import { useEffect, useState } from "react"
import { getEnrollmentCountBySchedule, isEnrolledInSchedule } from "@/lib/actions/enrollment"
import { useSession } from "next-auth/react"
import CancelEnrollmentButton from "../enrollment/CancelEnrollmentButton"

/** Props de `ScheduleInfo`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
  userRole: UserRole
  className?: ClassNameValue

  /** Função para atualizar os horários. */
  updateSchedules?: () => void
}
/** Card com informações de um horário. */
export default function ScheduleInfo({ activity, schedule, userRole, updateSchedules, className }: Props) {
  // Obter usuário
  const { data: session } = useSession()

  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const [enrollmentCount, setEnrollmentCount] = useState(0)

  useEffect(() => {
    isEnrolledInSchedule(session?.user?.id!, schedule.id).then(setAlreadyEnrolled)
    getEnrollmentCountBySchedule(schedule.id).then(setEnrollmentCount)
  }, [session, schedule])

  return (
    <Card className={cn("p-4 md:w-full gap-y-3 gap-x-2 flex-row flex-wrap max-md:*:flex-1 max-md:*:min-w-36 max-md:items-center justify-around *:items-center", className)}>
      <CardHeader className="p-0 flex-1">
        <CardTitle className="text-nowrap text-center flex flex-col gap-2">
          {/* Dia e horário */}
          <span>{schedule.dayWeek}</span>
          <span>{schedule.time}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-center flex-1">
        {/* Sala */}
        <p>Sala: {schedule.classroom || "N/A"}</p>
        {/* Quantidade de inscritos */}
        <p>
          Inscritos: {enrollmentCount}/{activity.maxParticipants}
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-4 md:mt-1.5 p-0 flex-1">
        {/* Botões para alunos */}
        {userRole === "student" && (
          <>
            {alreadyEnrolled ? (
              <CancelEnrollmentButton session={session!} activity={activity} schedule={schedule} /> // botão de cancelar inscrição
            ) : (
              <EnrollmentButton session={session!} activity={activity} schedule={schedule} /> // botão de realizar inscrição
            )}
          </>
        )}

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
