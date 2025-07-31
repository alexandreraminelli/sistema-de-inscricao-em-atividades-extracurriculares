import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

/** Página de erro 404 (não encontrado). */
export default function NotFound() {
  return (
    <div
      className="h-full flex flex-col items-center 
        gap-4 px-4 pt-8 pb-6
        md:gap-6 md:px-24"
    >
      {/* Imagem */}
      <aside>
        <Image src="/images/illustrations/404.svg" alt="Ilustração de cachorro olhando triste após comer a página" width={185} height={216} />
      </aside>
      {/* Título */}
      <header>
        <h1 className="font-semibold text-center text-3xl lg:text-4xl">404: Página Não Encontrada</h1>
      </header>
      <main className="text-center space-y-2 text-base text-muted-foreground">
        {/* Explicação */}
        <p>A página que você está tentando acessar não existe ou não é possível acessá-la no momento.</p>
        <p>Verifique se o endereço inserido está correto ou tente novamente mais tarde.</p>

        {/* Botão pro início */}
        <Button size="lg" className="mt-2 md:mt-4 w-fit">
          <HomeIcon />
          <Link href="/">Voltar pro início</Link>
        </Button>
      </main>
      {/* Rodapé */}
      <footer className="mt-auto">
        <Logo className="h-10 md:h-12" />
      </footer>
    </div>
  )
}
