import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"
import { ButtonHTMLAttributes } from "react"

/** Props de `ButtonWithAlertDialog`. */
export interface ButtonWithAlertDialogProps {
  /** Botão principal. */
  button: {
    /** Tipo de botão. */
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
    /** Variação do botão. */
    variant?: VariantProps<typeof buttonVariants>["variant"]
    /** Tamanho do botão. */
    size?: VariantProps<typeof buttonVariants>["size"]
    /** Texto do botão. */
    text: string
    /** Ícone do botão. */
    Icon?: LucideIcon
    /** Estilos adicionais. */
    className?: string
  }
  /** Conteúdo do Alert Dialog. */
  alertDialog: {
    /** Título do alert. */
    title: string
    /** Descrição do alert. */
    description: string
    /** Texto do botão de cancelar (padrão: "Cancelar"). */
    cancel?: string
    /** Texto do botão de ação (padrão: igual ao texto do botão principal). */
    actionText?: string
    /** Função executada ao clicar no botão de confirmar. */
    onAction?: () => void
  }
}

/** Componente `Button` com o componente `Alert Dialog`. */
export default function ButtonWithAlertDialog({
  button: {
    // props do botão
    type = "button",
    variant = "default",
    size = "default",
    text,
    Icon,
    className,
  },
  alertDialog: {
    // props do alert dialog
    title,
    description,
    cancel = "Cancelar",
    actionText = text,
    onAction = () => {},
  },
}: ButtonWithAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {/* Botão exibido que abre o dialog */}
        <Button type={type} variant={variant} size={size} className={cn("w-full", className)}>
          {Icon && <Icon />} {text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
