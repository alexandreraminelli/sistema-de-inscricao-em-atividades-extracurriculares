"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import { sidebarMenu } from "@/constants/layout/sidebarMenu"
import AppSidebarMenuItem from "./AppSidebarMenuItem"

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
