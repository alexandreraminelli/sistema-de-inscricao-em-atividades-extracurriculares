import { SidebarTrigger } from "@/components/ui/sidebar"

/** Cabeçalho da aplicação. */
export default function Header() {
  return (
    <header
      className="flex flex-row items-center
        gap- md:gap-3 p-0.5
        sticky top-1
        bg-sidebar border-l border-sidebar-border
        rounded-lg shadow-md"
    >
      {/* Botão de abrir/fechar sidebar */}
      <SidebarTrigger size="lg" />
      {/* Título do App */}
      <h1 className="font-semibold max-sm:text-sm text-md">Inscrição em Atividades Extracurriculares</h1>
    </header>
  )
}
