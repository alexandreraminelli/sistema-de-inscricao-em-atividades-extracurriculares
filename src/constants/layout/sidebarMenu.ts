import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, ClipboardListIcon, HouseIcon } from "lucide-react"

/** Menu da sidebar para alunos. */
export const studentSidebar: SidebarItemsType[] = [
  { title: "Início", href: "/", icon: HouseIcon },
  { title: "Atividades", href: "/atividades", icon: BookOpenIcon },
  { title: "Suas Inscrições", href: "/inscricoes", icon: ClipboardListIcon },
]

/** Menu da sidebar para professores e administradores. */
export const teacherSidebar: SidebarItemsType[] = []
