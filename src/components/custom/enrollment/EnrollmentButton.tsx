"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule, enrollment } from "@/database/schema"
import { createEnrollment } from "@/lib/actions/enrollment"
import { ClipboardCheckIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

/** Props de `EnrollmentButton`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
}

/** Botão que realiza a inscrição do aluno em uma atividade. */
export default function EnrollmentButton({ activity, schedule }: Props) {
  const { data: session } = useSession()

  /** Função para realizar a inscrição. */
  async function handleEnrollment() {
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
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleEnrollment} size="icon" variant="default">
          <ClipboardCheckIcon />
          <span className="sr-only">Inscrever-se</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Realizar Inscrição</TooltipContent>
    </Tooltip>
  )
}
