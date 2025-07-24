"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { quickAccessMenu } from "@/constants/layout/sidebarMenu"
import { UserRole } from "@/types/auth/authCredentials"
import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { ChevronRight, Grid2x2Icon, LinkIcon, LucideIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useState } from "react"

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
      <AppSidebarGroup label="Pesquisar atividades">
        {/* Categorias */}
        <AppSidebarCollapsibleMenu title="Categorias" Icon={Grid2x2Icon} itemList={[]} userRole={userRole} />
      </AppSidebarGroup>
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
function AppSidebarMenu({ itemList, userRole }: { itemList: SidebarItemsType[]; userRole: UserRole }) {
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

/** Menu do sidebar colapsível. */
function AppSidebarCollapsibleMenu({ title, Icon, itemList, userRole }: { title: string; Icon: LucideIcon; itemList: SidebarItemsType[]; userRole: UserRole }) {
  // Status do collapsible (aberto ou fechado)
  const [open, setOpen] = useState(true)

  return (
    <SidebarMenu>
      <Collapsible defaultOpen={open} onOpenChange={setOpen} className="group/collapsible">
        <SidebarMenuItem>
          {/* Item principal */}
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Icon />
              {title}
              {/* Ícone de seta (animação ao expandir) */}
              <ChevronRight className={`ms-auto transition-transform ${open ? "rotate-90" : ""}`} />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {/* Sub-itens */}
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>Sub-item 1</SidebarMenuSubItem>
              <SidebarMenuSubItem>Sub-item 1</SidebarMenuSubItem>
              <SidebarMenuSubItem>Sub-item 1</SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
