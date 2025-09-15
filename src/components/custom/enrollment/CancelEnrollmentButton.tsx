import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { activity, schedule } from "@/database/schema"
import { ClipboardXIcon, LoaderCircleIcon } from "lucide-react"
import { useState } from "react"

/** Props de `EnrollmentButton`. */
interface Props {
  activity: typeof activity.$inferSelect
  schedule: typeof schedule.$inferSelect
}

/** Botão que cancela a inscrição do aluno em um horário. */
export default function CancelEnrollmentButton({ activity, schedule }: Props) {
  // Variáveis de estado
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => {}} size="icon" variant="destructive" disabled={isSubmitting}>
          {/* Ícone */}
          {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : <ClipboardXIcon />}
          {/* Label */}
          <span className="sr-only">Inscrever-se</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Cancelar Inscrição</TooltipContent>
    </Tooltip>
  )
}
