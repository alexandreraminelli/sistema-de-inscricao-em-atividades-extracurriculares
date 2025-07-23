import Favicon from "@/components/custom/Favicon"
import { Sidebar, SidebarContent, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar"
import AppSidebarFooter from "./AppSidebarFooter"
import AppSidebarMenu from "./AppSidebarMenu"

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
      <SidebarContent>
        <AppSidebarMenu />
      </SidebarContent>

      <SidebarSeparator />
      {/* Rodapé */}
      <AppSidebarFooter />
    </Sidebar>
  )
}
