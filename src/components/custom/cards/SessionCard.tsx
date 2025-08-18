import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { activity } from "@/database/schema"
import { cn } from "@/lib/utils"
import { CalendarPlusIcon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
}

/** Card de horário das atividades. */
export default function SessionCard({ activity }: Props) {
  return (
    <Card className="p-6 items-center">
      <CardHeader className="p-0 m-0 w-full">
        <CardTitle className="text-center">Horários</CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-0 w-full">
        {/* Horários da atividade */}
      </CardContent>
      <CardFooter className="p-0 m-0 w-full *:flex-1">
        {/* Botão de adicionar horário */}
        <Button variant="outline">
          <CalendarPlusIcon /> Adicionar Atividade
        </Button>
      </CardFooter>
    </Card>
  )
}
