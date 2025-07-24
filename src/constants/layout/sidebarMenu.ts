import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

/** Menu de acesso rápido. */
export const quickAccessMenu: SidebarItemsType[] = [
  { title: "Início", role: "all", href: "/", icon: HouseIcon },
  { title: "Atividades", role: "all", href: "/atividades", icon: BookOpenIcon },
  { title: "Suas Inscrições", role: "student", href: "/inscricoes", icon: ClipboardListIcon },
]
