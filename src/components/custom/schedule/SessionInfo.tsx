import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { PencilIcon } from "lucide-react"
import DeleteScheduleButton from "../button/deleteButton/DeleteScheduleButton"
import ScheduleForm from "../form/ScheduleForm"

/** Props de `SessionInfo`. */
interface SessionInfoProps {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
  userRole: UserRole

  /** Função para atualizar os horários. */
  updateSchedules?: () => void
}
/** Card com informações de um horário. */
export default function SessionInfo({ activity, schedule, userRole, updateSchedules }: SessionInfoProps) {
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
