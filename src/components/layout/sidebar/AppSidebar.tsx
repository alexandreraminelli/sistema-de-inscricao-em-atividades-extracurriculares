import Favicon from "@/components/custom/Favicon"
import { Sidebar, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar"
import AppSidebarFooter from "./AppSidebarFooter"
import AppSidebarContent from "./menu/AppSidebarContent"

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Cabeçalho */}
      <SidebarHeader className="flex flex-row">
        <Favicon className="size-7" />
      </SidebarHeader>
      <SidebarSeparator />

      {/* Conteúdo */}
      <AppSidebarContent />

      <SidebarSeparator />
      {/* Rodapé */}
      <AppSidebarFooter />
    </Sidebar>
  )
}
