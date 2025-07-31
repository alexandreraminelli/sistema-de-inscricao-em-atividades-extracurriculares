import Favicon from "@/components/custom/Favicon"
import { Sidebar, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar"
import { Session } from "next-auth"
import AppSidebarFooter from "./AppSidebarFooter"
import AppSidebarContent from "./menu/AppSidebarContent"

/** Props do `AppSidebar`. */
interface Props {
  /** Sessão do usuário logado. */
  session: Session
}

/** Sidebar do aplicativo exibido nas páginas do usuário (após autenticação). */
export default function AppSidebar({ session }: Props) {
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
