import { Button } from "@/components/ui/button"
import { schedule } from "@/database/schema"
import { ClipboardCheckIcon } from "lucide-react"

/** Props de `EnrollmentButton`. */
interface Props {
  schedule: typeof schedule.$inferSelect
}

/** Botão que realiza a inscrição do aluno em uma atividade. */
export default function EnrollmentButton({ schedule }: Props) {
  return (
    <Button size="lg" variant="default">
      <ClipboardCheckIcon />
      Inscrever-se
    </Button>
  )
}
