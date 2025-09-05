"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { activity } from "@/database/schema"
import { ClipboardCheckIcon } from "lucide-react"
import ScheduleList from "@/components/custom/schedule/ScheduleList"

/** Props de `EnrollmentButton`. */
interface Props {
  activity: typeof activity.$inferSelect
}

/** Botão de inscrição em atividade. */
export default function EnrollmentDialogButton({ activity }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" /*disabled*/>
          <ClipboardCheckIcon />
          Inscrever-se
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-7">Realizar Inscrição na atividade {activity.name}</DialogTitle>
          <DialogDescription>Escolha um dos horários abaixo:</DialogDescription>
          {/* Lista de atividades */}
          <ScheduleList activity={activity} userRole="student" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
