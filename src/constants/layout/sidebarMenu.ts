import { SidebarItemsType } from "@/types/layout/SidebarMenuType"
import { BookOpenIcon, CalendarIcon, ClipboardListIcon, GraduationCapIcon, HouseIcon, InfoIcon } from "lucide-react"

/** Menu da sidebar para alunos. */
export const studentSidebar: SidebarItemsType[] = [
  { label: "Início", href: "/", icon: HouseIcon },
  { label: "Atividades", href: "/atividades", icon: BookOpenIcon },
  { label: "Suas Inscrições", href: "/inscricoes", icon: ClipboardListIcon },
  { label: "Calendário", href: "/calendario", icon: CalendarIcon },
  { label: "Certificados", href: "/certificados", icon: GraduationCapIcon },
  { label: "Informações Gerais", href: "/informacoes", icon: InfoIcon },
]

/** Menu da sidebar para professores e administradores. */
export const teacherSidebar: SidebarItemsType[] = []
