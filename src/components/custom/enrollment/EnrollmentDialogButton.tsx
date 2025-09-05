"use client"

import ScheduleList from "@/components/custom/schedule/ScheduleList"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { activity, schedule } from "@/database/schema"
import { ClipboardCheckIcon } from "lucide-react"

/** Props de `EnrollmentButton`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedules: (typeof schedule.$inferSelect)[]
}

/** Botão que abre o Dialog para inscrição nas atividades. */
export default function EnrollmentDialogButton({ activity, schedules }: Props) {
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
          <ScrollArea className="max-h-[50vh]">
            {/* Lista de atividades */}
            <ScheduleList schedules={schedules} activity={activity} userRole="student" />
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
