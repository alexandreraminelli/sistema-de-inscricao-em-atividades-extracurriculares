import { LucideIcon } from "lucide-react"

/** Tipagem dos links da barra de navegação no sidebar. */
export interface SidebarItemsType {
  /** Título do link. */
  title: string
  /** Endpoint do link. */
  href: string
  /** Descrição da página. Exibido no tooltip. */
  description?: string
  /** Ícone do link. */
  icon: LucideIcon
}
