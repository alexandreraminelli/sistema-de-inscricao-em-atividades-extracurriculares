"use client"

import { activity } from "@/database/schema"
import { createActivity } from "@/lib/actions/activity"
import { activitySchema } from "@/schemas/activitySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

/** Props de `ActivityForm`. */
interface Props {
  /** Tipo de formulário (criar ou editar atividade). */
  type?: "create" | "edit"
}

/** Formulário de criação ou edição de atividades extracurriculares. */
export default function ActivityForm({ type }: Props) {
  /** Hook do Next.js para manipulação de rotas. */
  const router = useRouter()

  /** Definição do formulário. */
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema), // Usar schema para validação
    defaultValues: {
      name: "",
      category: "",
      description: "",
      teacher: "",
      coverImg: "",
    },
  })

  /** Função para enviar o formulário. */
  const onSubmit = async (values: z.infer<typeof activitySchema>) => {
    const result = await createActivity(values)

    // Atividade criada com sucesso
    if (result.success)
      toast.success("Atividade criada com sucesso!", {
        description: `Atividade '${result.data.name}' criada.`,
        action: {
          // botão para abrir página da atividade
          label: "Ver atividade",
          onClick: () => router.push(`/atividades/${result.data.id}`),
        },
      })
    // Erro ao criar atividade
    else toast.error("Erro ao criar atividade!", { description: result.message })
  }

  return <p>Form de atividades extracurriculares</p>
}
