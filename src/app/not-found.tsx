import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"
import { HomeIcon, SearchXIcon } from "lucide-react"
import Link from "next/link"

/** Página de erro 404 (não encontrado). */
export default function NotFound() {
  return (
    <div
      className="h-dvh flex flex-col justify-between items-center 
        gap-4 md:gap-9 px-4 md:px-24 pt-20 pb-6"
    >
      <main
        className="flex flex-col items-center
          gap-10"
      >
        {/* Título */}
        <div className="flex flex-row items-center gap-1.5 lg:gap-3.5">
          <SearchXIcon className="size-16 lg:size-20" />
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl transition-all">404: Página Não Encontrada</h1>
        </div>
        {/* Explicação */}
        <div className="text-center space-y-2 *:text-base lg:*:text-lg">
          <p>A página que você está tentando acessar não existe ou não é possível acessá-la no momento.</p>
          <p>Verifique se o endereço inserido está correto ou tente novamente mais tarde.</p>
        </div>
        {/* Botão pro início */}
        <Button size="lg" className="w-fit">
          <HomeIcon />
          <Link href="/">Voltar pro início</Link>
        </Button>
      </main>

      {/* Rodapé */}
      <footer>
        <Logo className="h-10 md:h-12" />
      </footer>
    </div>
  )
}
