import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

/** Campo de senha. */
export default function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  // Estado da visibilidade da senha
  const [isView, setIsView] = useState(false)

  /** Rótulo do botão, dependendo da visibilidade atual. */
  const label = isView ? "Ocultar senha" : "Mostrar senha"

  /** Função para alternar a visibilidade da senha. */
  const handleToggleVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevenir o comportamento padrão (enviar form)
    e.stopPropagation() // Evitar a propagação para outros elementos
    setIsView(!isView) // Alternar visibilidade
  }

  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      <Input
        type={isView ? "text" : "password"} // visibilidade
        {...props}
      />
      {/* Botão de ocultar/mostrar senha */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant="outline" size="icon" onClick={handleToggleVisibility} aria-label={label}>
            {isView ? (
              // Ícone de ocultar senha
              <EyeIcon className="" />
            ) : (
              // Ícone de mostrar senha
              <EyeOffIcon className="" />
            )}
          </Button>
        </TooltipTrigger>
        {/* Texto do tooltip */}
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </div>
  )
}
