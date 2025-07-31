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
      className="flex mb-4
        flex-col gap-4
        md:flex-row md:flex-wrap"
    >
      {cards.map((card) => (
        <Card
          key={card.href}
          className="items-center justify-between px-2 
          flex-col-reverse max-md:w-full 
          sm:px-5 sm:flex-row md:min-w-sm flex-1
          "
        >
          {/* Texto */}
          <div className="w-full flex flex-col max-sm:items-center sm:justify-between h-full gap-2.5 pt-6">
            {/* Cabeçalho */}
            <CardHeader className="w-full text-center sm:text-start">
              <CardTitle className="font-semibold text-xl">
                <h2>{card.title}</h2>
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            {/* Ilustração */}
            <CardContent>
              {/* Botão */}
              <Button asChild>
                <Link href={card.href}>{card.buttonText}</Link>
              </Button>
            </CardContent>
          </div>
          {/* Ilustração */}
          <aside>
            <Image src={card.image} alt={`${card.title} icon`} width={150} height={150} className="object-contain max-lg:max-h-40 sm:h-full aspect-auto" />
          </aside>
        </Card>
      ))}
    </section>
  )
}
