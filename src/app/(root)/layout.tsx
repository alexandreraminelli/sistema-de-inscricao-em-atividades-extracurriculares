import AppSidebar from "@/components/layout/sidebar/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/** Layout dos componentes principais da aplicação. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  /** Sessão do usuário. */
  const session = await getServerSession()
  if (!session) redirect("/login") // Redirecionar usuários não autenticados para a página de login

  /** Interface do Next para ler cookies no servidor. */
  const cookieStore = await cookies()
  /** Se a sidebar está aberta ou fechada. Uso para manter o estado ao mudar de página. */
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* Sidebar */}
      <AppSidebar />

      <div>
        {/* Botão de expandir/compactar sidebar */}
        <SidebarTrigger />
        {/* Página */}
        {children}
      </div>
    </SidebarProvider>
  )
}
