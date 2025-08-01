import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { activity } from "@/database/schema"
import { ClipboardCheckIcon, SquareArrowOutUpRightIcon } from "lucide-react"

/** Props de `ActivityCard`. */
interface Props extends React.ComponentProps<typeof Card> {
  /** Atividade do card. */
  activity: typeof activity.$inferSelect
}

/** Card de atividades. */
export default function ActivityCard({ activity, ...props }: Props) {
  return (
    <Card
      className="justify-between items-center 
        px-2.5 flex-col
        sm:px-3.5 sm:flex-row"
      {...props}
    >
      {/* Nome da atividade */}
      <span className="h-fit text-center sm:text-start">{activity.name}</span>

      {/* Botões de ação */}
      <div className="flex flex-row items-center gap-3">
        {/* Botão de abrir página */}
        <Button variant="outline">
          <SquareArrowOutUpRightIcon /> Veja mais
        </Button>

        {/* Botão de inscrição */}
        <Button variant="default" disabled>
          <ClipboardCheckIcon />
          Inscrever-se
        </Button>
      </div>
    </Card>
  )
}
