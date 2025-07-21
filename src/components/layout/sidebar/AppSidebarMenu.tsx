"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { sidebarItems } from "@/constants/layout/sidebarItems"
import { usePathname } from "next/navigation"

/** Menu da sidebar com os links do aplicativo. */
export default function AppSidebarMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Barra de navegação</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Links do menu */}
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={usePathname() === item.href} // se link está ativo
              >
                <a href={item.href}>
                  <item.icon />
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
