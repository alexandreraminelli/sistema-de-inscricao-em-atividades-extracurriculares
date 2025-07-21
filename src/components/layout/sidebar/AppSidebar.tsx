import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebarMenu from "./AppSidebarMenu"

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Cabeçalho */}
      <SidebarHeader className="flex flex-row">
        <Favicon className="size-7" />
      </SidebarHeader>

      {/* Conteúdo */}
      <SidebarContent>
        <AppSidebarMenu />
      </SidebarContent>

      {/* Rodapé */}
      <SidebarFooter />
    </Sidebar>
  )
}
