"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ChevronUpIcon, LogOutIcon, UserIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

/** Rodapé do sidebar da aplicação. */
export default function AppSidebarFooter() {
  /** Sessão do usuário. */
  const { data: session } = useSession()

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
              {/* Botão de Logout */}
              <DropdownMenuItem
                variant="destructive"
                onClick={
                  // Realizar logout e redirecionar para página de login
                  () => signOut({ callbackUrl: "/login" })
                }
                className="cursor-pointer"
              >
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
