"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule, enrollment } from "@/database/schema"
import { createEnrollment } from "@/lib/actions/enrollment"
import { ClipboardCheckIcon, LoaderCircleIcon } from "lucide-react"
import { getServerSession, Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

/** Props de `EnrollmentButton`. */
interface Props {
  session: Session
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
}

/** Botão que realiza a inscrição do aluno em uma atividade. */
export default function EnrollmentButton({ session, activity, schedule }: Props) {
  // Variáveis de estado
  const [isSubmitting, setIsSubmitting] = useState(false)

  /** Função para realizar a inscrição. */
  async function handleEnrollment() {
    setIsSubmitting(true)
    // Montar parâmetros da inscrição
    const params: typeof enrollment.$inferInsert = {
      student: session?.user?.id!,
      schedule: schedule.id,
    }
    // Realizar inscrição no db
    const result = await createEnrollment(activity.id, params)

    if (result.success) {
      toast.success("Inscrição realizada com sucesso!")
    } else {
      toast.error("Erro ao realizar inscrição", { description: result.message })
    }
    setIsSubmitting(false)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleEnrollment} size="icon" variant="default" disabled={isSubmitting}>
          {/* Ícone */}
          {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : <ClipboardCheckIcon />}
          {/* Label */}
          <span className="sr-only">Inscrever-se</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Realizar Inscrição</TooltipContent>
    </Tooltip>
  )
}
