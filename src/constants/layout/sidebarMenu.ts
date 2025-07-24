import { SidebarGroupType, SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

/** Menu de acesso rápido. */
export const quickAccessMenu: SidebarItemsType[] = [
  { title: "Início", role: "all", href: "/", icon: HouseIcon },
  { title: "Suas Inscrições", role: "student", href: "/inscricoes", icon: ClipboardListIcon },
]

/** Dados dos ícones do menu. */
export const sidebarMenu: SidebarGroupType[] = [
  {
    label: "Acesso Rápido",
    menu: [],
  },
  {
    label: "Explorar atividades",
    menu: [
      // Todas as atividades
      // { title: "Todas as atividades", href: "/atividades", icon: BookOpenIcon },
    ],
  },
]
