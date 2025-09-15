"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule } from "@/database/schema"
import { cancelEnrollment, getEnrollmentInSchedule } from "@/lib/actions/enrollment"
import { ClipboardXIcon, LoaderCircleIcon } from "lucide-react"
import { Session } from "next-auth"
import { useEffect, useState } from "react"
import { toast } from "sonner"

/** Props de `EnrollmentButton`. */
interface Props {
  session: Session
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
}

/** Botão que cancela a inscrição do aluno em um horário. */
export default function CancelEnrollmentButton({ session, activity, schedule }: Props) {
  // Variáveis de estado
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enrollment, setEnrollment] = useState<any>(null)

  // Obter inscrição do aluno nesse horário
  useEffect(() => {
    getEnrollmentInSchedule(session.user.id, schedule.id).then((result) => {
      setEnrollment(result[0] ?? null)
    })
  }, [session.user.id, schedule.id])

  async function handleCancelEnrollment() {
    setIsSubmitting(true)
    const result = await cancelEnrollment(session.user.id, enrollment.id)

    if (result.success) {
      toast.success("Inscrição cancelada com sucesso!", { description: "Você pode realizar uma nova inscrição em um outro horário ou atividade, caso haja vagas disponíveis." })
    } else {
      toast.error("Erro ao cancelar inscrição", { description: result.message })
    }
    setIsSubmitting(false)
  }

  return (
    <Tooltip>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button onClick={() => {}} size="icon" variant="destructive" disabled={isSubmitting}>
              {/* Ícone */}
              {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : <ClipboardXIcon />}
              {/* Label */}
              <span className="sr-only">Inscrever-se</span>
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza de que deseja cancelar sua inscrição?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação irá cancelar sua inscrição na atividade {activity.name} no horário ({schedule.dayWeek} | {schedule.time}). Você poderá se inscrever novamente, caso haja vagas disponíveis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Manter minha inscrição</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelEnrollment} className="bg-destructive hover:bg-destructive/90">
              Cancelar inscrição
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TooltipContent>Cancelar Inscrição</TooltipContent>
    </Tooltip>
  )
}
