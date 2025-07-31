import Favicon from "@/components/custom/Favicon"
import { Sidebar, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import AppSidebarFooter from "./AppSidebarFooter"
import AppSidebarContent from "./menu/AppSidebarContent"

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default async function AppSidebar() {
  // Obter usuário logado
  const session = await getServerSession(authOptions)

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Cabeçalho */}
      <SidebarHeader className="flex flex-row">
        <Favicon className="size-7" />
      </SidebarHeader>
      <SidebarSeparator />
      {/* Conteúdo */}
      <AppSidebarContent session={session!} />
      <SidebarSeparator />
      {/* Rodapé */}
      <AppSidebarFooter session={session!} />
    </Sidebar>
  )
}
