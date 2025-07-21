import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar"

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default function AppSidebar() {
  return (
    <Sidebar>
      {/* Cabeçalho */}
      <SidebarHeader />

      {/* Conteúdo */}
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      {/* Rodapé */}
      <SidebarFooter />
    </Sidebar>
  )
}
