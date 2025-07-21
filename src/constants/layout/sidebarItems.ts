import { SidebarItemsType } from "@/types/layout/SidebarItemsType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

export const sidebarItems: SidebarItemsType[] = [
  { title: "Início", href: "/", description: "Página inicial", icon: HouseIcon },
  { title: "Atividades", href: "/atividades", description: "Lista de atividades oferecidas", icon: BookOpenIcon },
  { title: "Suas Inscrições", href: "/inscricoes", description: "Suas inscrições", icon: ClipboardListIcon },
]
