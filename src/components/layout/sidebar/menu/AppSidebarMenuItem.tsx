"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { LinkIcon } from "lucide-react"
import { usePathname } from "next/navigation"

/** Item do menu da sidebar.  */
export default function AppSidebarMenuItem({ item }: { item: SidebarItemsType }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={usePathname() === item.href} // se link está ativo
        aria-label={item.description || item.title}
      >
        <a href={item.href}>
          {item.icon ? <item.icon /> : <LinkIcon />} {/* Ícone do item */}
          <span>{item.title}</span> {/* Título do item */}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
