"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ChevronUpIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

/** Rodapé do sidebar da aplicação. */
export default function AppSidebarFooter({ session }: { session: Session }) {
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
                  () => {
                    signOut({ callbackUrl: "/login" })
                    toast.info("Sessão encerrada", { description: "Você foi desconectado com sucesso." }) // notificação
                  }
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
