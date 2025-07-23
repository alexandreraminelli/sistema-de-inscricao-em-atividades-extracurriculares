"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { sidebarMenu } from "@/constants/layout/sidebarMenu"
import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { usePathname } from "next/navigation"

/** Menu da sidebar com os links do aplicativo. */
export default function AppSidebarMenu() {
  return (
    <>
      {/* Renderizar os grupos */}
      {sidebarMenu.map((group) => (
        <SidebarGroup key={group.label}>
          {/* Título do grupo */}
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          {/* Conteúdo do grupo */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Renderizar os itens do menu */}
              {group.menu.map((item, index) => (
                <AppSidebarMenuItem key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

/** Item do menu da sidebar.  */
function AppSidebarMenuItem({ item }: { item: SidebarItemsType }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={usePathname() === item.href} // se link está ativo
      >
        <a href={item.href}>
          <item.icon /> {/* Ícone do item */}
          <span>{item.title}</span> {/* Título do item */}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
