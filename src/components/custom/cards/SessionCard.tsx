import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { activity, session } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { CalendarPlusIcon } from "lucide-react"
import SessionForm from "../form/SessionForm"
import { db } from "@/database/drizzle"
import { eq } from "drizzle-orm"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole
}

/** Card de horário das atividades. */
export default async function SessionCard({ activity, userRole }: Props) {
  // Obter horários da atividade
  const sessions = await db.select().from(session).where(eq(session.activity, activity.id))

  return (
    <Card className="p-6 md:px-4 items-center">
      <CardHeader className="p-0 m-0 w-full">
        <CardTitle className="text-center">Horários</CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-0 w-full md:max-w-48 flex flex-row flex-wrap gap-2 *:flex-1">
        {/* Horários da atividade */}
        {sessions.length === 0 ? (
          // Se não houver horários
          <p className="text-muted-foreground text-center">Ainda não há horários definidos.</p>
        ) : (
          sessions.map((s) => <SessionInfo key={s.id} session={s} />)
        )}
      </CardContent>
      <CardFooter className="p-0 m-0 w-full *:flex-1">
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
              <SessionForm type="create" activity={activity} inDialog />
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}

/** Props de `SessionInfo`. */
interface SessionInfoProps {
  session: typeof session.$inferSelect
}
/** Card com informações de um horário. */
function SessionInfo({ session }: SessionInfoProps) {
  return (
    <Card className="p-4 min-w-32  gap-1">
      <CardHeader className="p-0">
        <CardTitle className="text-nowrap text-center flex flex-col gap-2">
          {/* Dia e horário */}
          <span>{session.dayWeek}</span>
          <span>{session.time}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Sala */}
        <p className="text-muted-foreground text-center">Sala: {session.classroom || "N/A"}</p>
      </CardContent>
    </Card>
  )
}
