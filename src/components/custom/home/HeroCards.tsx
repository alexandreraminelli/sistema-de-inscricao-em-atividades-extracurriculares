import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardLinkType } from "@/types/content/CardType"
import Image from "next/image"
import Link from "next/link"

/** Props de `HomeCards`. */
interface Props {
  /** Lista de cards renderizados. */
  cards: CardLinkType[]
}
/** Cards de Hero Section. */
export default function HeroCards({ cards }: Props) {
  return (
    <section>
      {cards.map((card) => (
        <Card key={card.href}>
          {/* Conteúdo do card */}
          <div>
            {/* Cabeçalho */}
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            {/* Botão */}
            <CardContent>
              <Button asChild>
                <Link href={card.href}>{card.buttonText}</Link>
              </Button>
            </CardContent>
          </div>
          {/* Imagem */}
          <aside>
            <Image src={card.image} alt={`${card.title} icon`} width={150} height={112} className="object-contain" />
          </aside>
        </Card>
      ))}
    </section>
  )
}
