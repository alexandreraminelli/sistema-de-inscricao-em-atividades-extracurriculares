import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "../custom/theme/ModeToggle"

/** Cabeçalho da aplicação. */
export default function Header() {
  return (
    <header
      className="flex flex-row items-center
        gap-1 md:gap-3 p-0.5
        sticky top-1
        bg-sidebar border border-sidebar-border
        rounded-lg shadow-md"
    >
      {/* Botão de abrir/fechar sidebar */}
      <SidebarTrigger size="lg" />
      {/* Título do App */}
      <h1 className="font-semibold text-xs sm:text-sm md:text-md">Inscrição em Atividades Extracurriculares</h1>
      {/* Botão de tema */}
      <div className="flex items-center ms-auto me-2">
        <ModeToggle />
      </div>
    </header>
  )
}
