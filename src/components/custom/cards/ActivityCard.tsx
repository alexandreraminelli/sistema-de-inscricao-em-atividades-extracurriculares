import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { activity } from "@/database/schema"
import { UserRole } from "@/types/auth/authCredentials"
import { ClipboardCheckIcon, SquareArrowOutUpRightIcon } from "lucide-react"
import Link from "next/link"

/** Props de `ActivityCard`. */
interface Props extends React.ComponentProps<typeof Card> {
  /** Atividade do card. */
  activity: typeof activity.$inferSelect
  /** Papel do usuário. */
  userRole: UserRole
}

/** Card de atividades. */
export default function ActivityCard({ activity, userRole, ...props }: Props) {
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
        <Button variant="outline" asChild>
          <Link href={`/atividades/${activity.id}`}>
            <SquareArrowOutUpRightIcon /> Veja mais
          </Link>
        </Button>

        {/* Botão de inscrição */}
        {userRole === "student" && (
          <Button variant="default" disabled>
            <ClipboardCheckIcon />
            Inscrever-se
          </Button>
        )}
      </div>
    </Card>
  )
}
