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
export default function ActivityCard({ activity, className, ...props }: Props) {
  return (
    <Card
      className="px-2.5 md:px-3.5 justify-between
      flex-col items-center 
      md:flex-row md:items-start"
    >
      {/* Nome da atividade */}
      <span className="text-center">{activity.name}</span>

      {/* Botões de ação */}
      <div className="flex flex-row items-center gap-3">
        {/* Botão de abrir página */}
        <Button variant="outline">
          <SquareArrowOutUpRightIcon /> Veja mais
        </Button>
        {/* Botão de inscrição */}
        <Button variant="default" disabled>
          <ClipboardCheckIcon />
          Inscrever
        </Button>
      </div>
    </Card>
  )
}
