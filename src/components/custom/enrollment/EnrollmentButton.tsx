import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { schedule } from "@/database/schema"
import { ClipboardCheckIcon } from "lucide-react"

/** Props de `EnrollmentButton`. */
interface Props {
  schedule: typeof schedule.$inferSelect
}

/** Botão que realiza a inscrição do aluno em uma atividade. */
export default function EnrollmentButton({ schedule }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="default">
          <ClipboardCheckIcon />
          <span className="sr-only">Inscrever-se</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Realizar Inscrição</TooltipContent>
    </Tooltip>
  )
}
