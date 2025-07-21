import AppSidebar from "@/components/layout/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

/** Layout dos componentes principais da aplicação. */
export default async function Layout({ children }: { children: React.ReactNode }) {
  // Redirecionar usuários não autenticados para a página de login
  const session = await getServerSession()
  if (!session) redirect("/login")

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex flex-row">
        {/* Botão de expandir/compactar sidebar */}
        <SidebarTrigger />
        {/* Página */}
        {children}
      </div>
    </SidebarProvider>
  )
}
