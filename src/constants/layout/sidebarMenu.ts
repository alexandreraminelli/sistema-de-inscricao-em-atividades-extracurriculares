import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

/** Menu da sidebar para alunos. */
export const studentSidebar: SidebarItemsType[] = [
  { label: "Início", href: "/", icon: HouseIcon },
  { label: "Atividades", href: "/atividades", icon: BookOpenIcon },
  { label: "Suas Inscrições", href: "/inscricoes", icon: ClipboardListIcon },
]

/** Menu da sidebar para professores e administradores. */
export const teacherSidebar: SidebarItemsType[] = []
