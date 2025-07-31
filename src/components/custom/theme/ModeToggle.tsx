"use client"

import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

/** Tipagem do array de opções de tema. */
interface ThemeOptionType {
  label: string
  value: string
  icon: LucideIcon
}

/** Botão de alternar o tema claro e escuro. */
export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const iconClass = "absolute h-7 w-7"

  const themeOptions: ThemeOptionType[] = [
    { label: "Sistema", value: "system", icon: MonitorIcon },
    { label: "Claro", value: "light", icon: SunIcon },
    { label: "Escuro", value: "dark", icon: MoonIcon },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* Ícone */}
          {theme === "light" || resolvedTheme === "light" ? <SunIcon className={iconClass} /> : <MoonIcon className={iconClass} />}

          <span className="sr-only">Alterar tema</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="space-y-0.5">
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        {/* Opções de tema */}
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)} // aplicar tema
            className={theme === option.value ? "bg-accent/75" : ""} // destacar tema ativo
          >
            {/* Ícone e texto */}
            <option.icon />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
