import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    <section
      className="flex
        flex-col gap-4
        md:flex-row"
    >
      {cards.map((card) => (
        <Card key={card.href}>
          {/* Cabeçalho */}
          <CardHeader className="text-center">
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          {/* Ilustração */}
          <CardContent className="mx-auto">
            <aside>
              <Image src={card.image} alt={`${card.title} icon`} width={150} height={112} className="object-contain max-h-40" />
            </aside>
          </CardContent>
          {/* Botão */}
          <CardFooter className="mx-auto">
            <Button asChild>
              <Link href={card.href}>{card.buttonText}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
