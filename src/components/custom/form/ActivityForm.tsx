"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createActivity } from "@/lib/actions/activity"
import { activitySchema } from "@/schemas/activitySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
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

  return (
    <section className="space-y-4">
      {/* Título do formulário */}
      <header>
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center md:text-start">Formulário de Atividades</h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome da atividade */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da atividade</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome da atividade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Categoria */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descrição */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição da atividade. Objetivos, competências desenvolvidas, tópicos abordados, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Aplicador */}
          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aplicador</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Imagem */}

          {/* Botão de enviar */}
          <Button type="submit" className="mt-5 max-md:w-full">
            <PlusIcon />
            Adicionar Atividade
          </Button>
        </form>
      </Form>
    </section>
  )
}
