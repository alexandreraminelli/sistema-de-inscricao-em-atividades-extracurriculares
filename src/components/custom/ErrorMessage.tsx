import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"
import { BookOpenIcon, HomeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

/** Props do componente `NotFound`. */
interface Props {
  /** Título do erro. */
  title: string
  /** Array com parágrafos das mensagens */
  message: string[]
  /** Imagem da mensagem. */
  image?: string
}
/** Componente de página/item não encontrado. */
export default function ErrorMessage({ title, message, image = "/images/illustrations/error.svg" }: Props) {
  return (
    <div
      className="flex flex-col items-center
        gap-4 px-4 pt-6
        md:gap-6 md:px-24"
    >
      {/* Imagem */}
      <aside>
        <Image src={image} alt="Imagem Ilustrativa" width={185} height={216} className="max-h-full" />
      </aside>
      {/* Título */}
      <header>
        <h1 className="font-semibold text-center text-3xl lg:text-4xl">{title}</h1>
      </header>
      <main className="text-center space-y-2 text-base text-muted-foreground">
        {/* Explicação */}
        {message.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}

        {/* Botões */}
        <section className="flex flex-row justify-center gap-x-4 gap-y-1.5 flex-wrap">
          {/* Botão pro início */}
          <Button size="lg" className="mt-2 md:mt-4 w-fit">
            <HomeIcon />
            <Link href="/">Voltar pro início</Link>
          </Button>
          {/* Botão de atividades */}
          <Button size="lg" variant="secondary" className="mt-2 md:mt-4 w-fit">
            <BookOpenIcon />
            <Link href="/atividades">Explorar Atividades</Link>
          </Button>
        </section>
      </main>
      {/* Rodapé */}
      <footer className="mt-8">
        <Logo className="h-10 md:h-12" />
      </footer>
    </div>
  )
}
