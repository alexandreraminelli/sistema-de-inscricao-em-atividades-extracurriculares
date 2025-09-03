import { Button } from "@/components/ui/button"
import { ClipboardCheckIcon } from "lucide-react"

/** Botão de inscrição em atividade. */
export default function EnrollmentButton() {
  return (
    <Button variant="default" disabled>
      <ClipboardCheckIcon />
      Inscrever-se
    </Button>
  )
}
