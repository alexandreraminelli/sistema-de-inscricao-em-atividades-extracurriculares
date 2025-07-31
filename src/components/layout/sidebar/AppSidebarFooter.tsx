"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { UserRole } from "@/types/auth/authCredentials"
import { ChevronUpIcon, LogOutIcon, UserIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

/** Rodapé do sidebar da aplicação. */
export default function AppSidebarFooter() {
  /** Sessão do usuário. */
  const { data: session } = useSession()
  // Informações do usuário
  const userName = session?.user?.name || "Minha conta"
  const userRole = session?.user?.role === "student" ? "Aluno" : "Professor"

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip={`${userName} (${userRole})`}>
                <UserIcon />
                {/* Nome do usuário */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="truncate text-xs">{userRole}</span>
                </div>
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
