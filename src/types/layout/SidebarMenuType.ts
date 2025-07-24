import { LucideIcon } from "lucide-react"

/** Tipagem dos links da barra de navegação no sidebar. */
export interface SidebarItemsType {
  /** Título do link. */
  title: string
  /** Endpoint do link. */
  href: string
  /** Ícone do link. (opcional) */
  icon?: LucideIcon
  /** Para quais tipos de usuários o item está visível. */
  role: "student" | "teacher" | "all"
}

/** Tipagem dos grupos da sidebar. */
export interface SidebarGroupType {
  /** Nome do grupo. */
  label: string
  /** Links do menu. */
  menu: SidebarItemsType[]
}
