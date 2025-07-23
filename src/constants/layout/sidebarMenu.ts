import { SidebarGroupType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

/** Dados dos ícones do menu. */
export const sidebarMenu: SidebarGroupType[] = [
  {
    label: "Acesso Rápido",
    menu: [
      { title: "Início", href: "/", description: "Página inicial", icon: HouseIcon },

      { title: "Suas Inscrições", href: "/inscricoes", description: "Suas inscrições", icon: ClipboardListIcon },
    ],
  },
  {
    label: "Explorar atividades",
    menu: [
      // Todas as atividades
      { title: "Atividades", href: "/atividades", description: "Lista de atividades oferecidas", icon: BookOpenIcon },
    ],
  },
]
