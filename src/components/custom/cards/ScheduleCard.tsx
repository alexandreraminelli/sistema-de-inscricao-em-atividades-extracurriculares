import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { db } from "@/database/drizzle"
import { activity, schedule } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { eq } from "drizzle-orm"
import { CalendarPlusIcon, CalendarRangeIcon, ChevronDownIcon, PencilIcon, Trash2Icon } from "lucide-react"
import ScheduleForm from "../form/ScheduleForm"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole
}

/** Card de horário das atividades. */
export default async function SessionCard({ activity, userRole }: Props) {
  // Obter horários da atividade
  const sessions = await db.select().from(schedule).where(eq(schedule.activity, activity.id))

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
            {/* Horários da atividade */}
            {sessions.length === 0 ? (
              // Se não houver horários
              <p className="text-muted-foreground text-center">Ainda não há horários definidos.</p>
            ) : (
              sessions.map((s) => <SessionInfo key={s.id} activity={activity} schedule={s} userRole={userRole} />)
            )}
          </CardContent>
          <CardFooter className="p-0 m-0 mt-4 w-full *:flex-1">
            {/* Botão de adicionar horário */}
            {userRole === "teacher" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <CalendarPlusIcon /> Adicionar Horário
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Horário</DialogTitle>
                  </DialogHeader>
                  {/* Form de adicionar horário */}
                  <ScheduleForm type="create" activity={activity} inDialog />
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
}
/** Card com informações de um horário. */
function SessionInfo({ activity, schedule, userRole }: SessionInfoProps) {
  return (
    <Card
      className="p-4 min-w-32 md:w-full gap-y-2 gap-x-4
      flex-row max-md:flex-wrap max-md:*:flex-1 max-md:*:min-w-32 max-md:items-center justify-around
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
            <Button variant="outline" size="icon">
              <PencilIcon /> <span className="sr-only">Editar</span>
            </Button>
            {/* Botão de excluir */}
            <Button variant="destructive" size="icon">
              <Trash2Icon /> <span className="sr-only">Excluir</span>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
