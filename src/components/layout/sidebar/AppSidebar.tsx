import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import AppSidebarMenu from "./AppSidebarMenu"

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default function AppSidebar() {
  return (
    <Sidebar>
      {/* Cabeçalho */}
      <SidebarHeader />

      {/* Conteúdo */}
      <SidebarContent>
        <AppSidebarMenu />
      </SidebarContent>

      {/* Rodapé */}
      <SidebarFooter />
    </Sidebar>
  )
}
