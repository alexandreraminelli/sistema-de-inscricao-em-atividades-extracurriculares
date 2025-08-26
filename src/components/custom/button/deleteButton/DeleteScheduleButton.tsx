"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { activity, schedule } from "@/database/schema"
import { deleteSchedule } from "@/lib/actions/schedule"
import { LoaderCircleIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

/** Props de `DeleteScheduleButton`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
}

export default function DeleteScheduleButton({ activity, schedule }: Props) {
  // Status do processamento da ação
  const [isLoading, setIsLoading] = useState(false)

  /** Função para deletar horário. */
  const handleDelete = async () => {
    setIsLoading(true)
    const result = await deleteSchedule(schedule.id)

    if (result.success) {
      // Se der certo
      toast.success("Horário excluído com sucesso!", {
        description: `O horário da atividade ${activity.name} - ${schedule.dayWeek} ${schedule.time} e suas inscrições foram excluídas.`,
      })
    } else {
      // Se der erro
      toast.error("Erro ao excluir horário!", {
        description: result.message,
      })
    }
    setIsLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon /> <span className="sr-only">Excluir</span>
        </Button>
      </AlertDialogTrigger>
      {/* Alert Dialog (confirmar exclusão) */}
      <AlertDialogContent>
        <AlertDialogTitle>Excluir Horário</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza de que deseja excluir esse horário? Todas as inscrições realizadas nesse horário serão canceladas. Essa ação não pode ser desfeita.
          <br /> <br />
          <span className="font-bold">
            {activity.name} <br /> {schedule.dayWeek} às {schedule.time}
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircleIcon className="animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir Horário"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
