import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

/** Campo de senha. */
export default function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  // Estado da visibilidade da senha
  const [isView, setIsView] = useState(false)

  return (
    <div className="flex flex-row gap-2">
      <Input
        type={isView ? "text" : "password"} // visibilidade
        {...props}
      />
      {/* Botão de ocultar/mostrar senha */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          // Alternar visibilidade
          setIsView(!isView)
        }}
        aria-label={isView ? "Ocultar senha" : "Mostrar senha"}
      >
        {isView ? (
          // Ícone de ocultar senha
          <EyeIcon className="" />
        ) : (
          // Ícone de mostrar senha
          <EyeOffIcon className="" />
        )}
      </Button>
    </div>
  )
}
