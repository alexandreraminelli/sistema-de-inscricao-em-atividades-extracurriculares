import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/database/drizzle"
import { activity as activityDb, enrollment, schedule as scheduleDb } from "@/database/schema"
import { eq } from "drizzle-orm"
import { SquareArrowOutUpRightIcon } from "lucide-react"
import Link from "next/link"
import CancelEnrollmentButton from "./CancelEnrollmentButton"
import { Session } from "next-auth"

/** Props de `EnrollmentCard`. */
interface Props {
  session: Session
  enrollment: typeof enrollment.$inferSelect
}

/** Card de inscrição em atividade. */
export default async function EnrollmentCard({ session, enrollment }: Props) {
  // Obter horário
  const [schedule] = await db.select().from(scheduleDb).where(eq(scheduleDb.id, enrollment.schedule)).limit(1)
  // Obter atividade
  const [activity] = await db.select().from(activityDb).where(eq(activityDb.id, schedule.activity)).limit(1)

  return (
    <Card>
      {/* Cabeçalho */}
      <CardHeader>
        <CardTitle className="font-semibold text-lg">{activity.name}</CardTitle>
        <CardDescription className="text-md">
          {schedule.dayWeek} {schedule.time}
        </CardDescription>
      </CardHeader>

      {/* Informações */}
      <CardContent className="space-y-2">
        <p>
          <strong className="font-semibold">Sala:</strong> <span className="text-muted-foreground">{schedule.classroom}</span>
        </p>
        <p>
          <strong className="font-semibold">Código de Inscrição:</strong> <span className="text-muted-foreground">{enrollment.id.toUpperCase()}</span>
        </p>
      </CardContent>

      {/* Botões de ação */}
      <CardFooter className="gap-2.5 self-end mt-auto">
        {/* Abrir página da atividade */}
        <Button className="flex-1" variant="outline" asChild>
          <Link href={`/atividades/${activity.id}`}>
            <SquareArrowOutUpRightIcon /> Ver atividade
          </Link>
        </Button>
        {/* Cancelar inscrição */}
        <CancelEnrollmentButton session={session} activity={activity} schedule={schedule} />
      </CardFooter>
    </Card>
  )
}
