"use client"

import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { quickAccessMenu } from "@/constants/layout/sidebarMenu"
import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { LinkIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

/** Conteúdo principal do Sidebar */
export default function AppSidebarContent() {
  // Obter role do usuário
  const { data: session } = useSession()
  const userRole = session?.user?.role!

  return (
    <SidebarContent>
      {/* Acesso Rápido */}
      <AppSidebarGroup label="Acesso Rápido">
        <AppSidebarMenu itemList={quickAccessMenu} userRole={userRole} />
      </AppSidebarGroup>
      {/* Pesquisar atividades */}
      <AppSidebarGroup label="Pesquisar atividades"></AppSidebarGroup>
    </SidebarContent>
  )
}

/** Grupo do sidebar. */
function AppSidebarGroup({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>{children}</SidebarGroupContent>
    </SidebarGroup>
  )
}

/** Menu do Sidebar.  */
function AppSidebarMenu({ itemList, userRole }: { itemList: SidebarItemsType[]; userRole: "student" | "teacher" }) {
  // Filtrar itens de acordo com o tipo de usuário
  itemList = itemList.filter((item) => item.role === "all" || item.role === userRole)

  return (
    <SidebarMenu>
      {itemList.map((item) => (
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={usePathname() === item.href} // se link está ativo
            aria-label={item.title}
          >
            <a href={item.href}>
              {item.icon ? <item.icon /> : <LinkIcon />} {/* Ícone do item */}
              <span>{item.title}</span> {/* Título do item */}
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
