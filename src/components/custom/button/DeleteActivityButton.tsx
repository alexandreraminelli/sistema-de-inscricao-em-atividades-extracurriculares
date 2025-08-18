"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { activity } from "@/database/schema"
import { deleteActivity } from "@/lib/actions/activity"
import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  activity: typeof activity.$inferSelect
}

export default function DeleteActivityButton({ activity }: Props) {
  const router = useRouter()

  /** Função para deletar atividade. */
  const handleDelete = async () => {
    const result = await deleteActivity(activity.id)
    if (result.success) {
      // Se der certo
      toast.success("Atividade excluída com sucesso!", {
        description: `A atividade '${activity.name}' foi excluída.`,
      })
      router.push("/atividades") // Redireciona para a lista de atividades
    } else {
      // Se der erro
      toast.error("Erro ao excluir atividade!", {
        description: result.message,
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Botão de excluir */}
        <Button variant="destructive">
          <Trash2Icon /> Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* Alert Dialog */}
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Atividade</AlertDialogTitle>
          <AlertDialogDescription>Tem certeza que deseja excluir essa atividade? Essa ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
