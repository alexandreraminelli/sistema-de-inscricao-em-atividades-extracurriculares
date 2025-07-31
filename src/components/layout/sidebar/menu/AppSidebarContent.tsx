"use client"

import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { studentSidebar, teacherSidebar } from "@/constants/layout/sidebarMenu"
import { Session } from "next-auth"
import { usePathname } from "next/navigation"

/** Conteúdo principal do Sidebar */
export default function AppSidebarContent({ session }: { session: Session }) {
  // Renderizar menu de acordo com o papel do usuário
  const items = session?.user?.role === "student" ? studentSidebar : teacherSidebar

  /** Obter pathname atual. */
  const pathname = usePathname()

  return (
    <SidebarContent>
      <SidebarGroup>
        {/* Título */}
        <SidebarGroupLabel>Inscrição em Atividades Extracurriculares</SidebarGroupLabel>
        {/* Menu */}
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href} // se link está ativo
                  aria-label={`Link para ${item.label}`}
                  tooltip={item.label} // tooltip para sidebar recolhida
                >
                  <a href={item.href}>
                    <item.icon /> {/* Ícone do item */}
                    <span>{item.label}</span> {/* Rótulo do item */}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
