import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { sidebarItems } from "@/constants/layout/sidebarItems"

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
              <SidebarMenuButton asChild>
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
