import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { activity } from "@/database/schema"
import { UserRole } from "@/types/auth/UserRole"
import { CalendarPlusIcon } from "lucide-react"
import SessionForm from "../form/SessionForm"

/** Props de `SessionCard`. */
interface Props {
  activity: typeof activity.$inferSelect
  userRole: UserRole
}

/** Card de horário das atividades. */
export default function SessionCard({ activity, userRole }: Props) {
  return (
    <Card className="p-6 items-center">
      <CardHeader className="p-0 m-0 w-full">
        <CardTitle className="text-center">Horários</CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-0 w-full">{/* Horários da atividade */}</CardContent>
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
              <section>
                <SessionForm type="create" />
              </section>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
}
