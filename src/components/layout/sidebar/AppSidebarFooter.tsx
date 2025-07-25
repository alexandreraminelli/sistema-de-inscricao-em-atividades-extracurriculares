import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ChevronUpIcon, LogOutIcon, UserIcon } from "lucide-react"
import { getServerSession } from "next-auth"

/** Rodapé do sidebar da aplicação. */
export default async function AppSidebarFooter() {
  /** Sessão do usuário. */
  const session = await getServerSession()

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <UserIcon />
                {/* Nome do usuário */}
                {session?.user?.name}
                {/* Ícone de abrir menu */}
                <ChevronUpIcon className="ms-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            {/* Conteúdo do Dropdown */}
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              {/* Opção de Logout */}
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
