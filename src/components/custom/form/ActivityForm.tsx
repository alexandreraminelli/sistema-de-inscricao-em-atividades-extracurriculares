"use client"

import { Button } from "@/components/ui/button"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { activity as activityDb } from "@/database/schema"
import { createActivity } from "@/lib/actions/activity"
import { activitySchema } from "@/schemas/activitySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

/** Props de `ActivityForm`. */
interface Props {
  /** Tipo de formulário: criar ou editar atividade. */
  type: "create" | "edit"
  /** Atividade a ser editada. */
  activity?: typeof activityDb.$inferSelect
}
/** Formulário de criação ou edição de atividades extracurriculares. */
export default function ActivityForm({ type, activity }: Props) {
  /** Hook do Next.js para manipulação de rotas. */
  const router = useRouter()

  /** Estados para dados das APIs */
  const [categories, setCategories] = useState<ComboboxOption[]>([])
  const [teachers, setTeachers] = useState<ComboboxOption[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true)

  /** Buscar dados das APIs */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar categorias e professores em paralelo
        const [categoriesResponse, teachersResponse] = await Promise.all([fetch("/api/data/categories"), fetch("/api/data/teacher")])

        const [categoriesData, teachersData] = await Promise.all([categoriesResponse.json(), teachersResponse.json()])

        // Converter categorias para o formato do Combobox
        const formattedCategories: ComboboxOption[] = categoriesData.map((cat: any) => ({
          value: cat.id,
          label: cat.name,
        }))

        // Converter professores para o formato do Combobox
        const formattedTeachers: ComboboxOption[] = teachersData.map((teacher: any) => ({
          value: teacher.id,
          label: teacher.name,
        }))

        setCategories(formattedCategories)
        setTeachers(formattedTeachers)
      } catch (error) {
        toast.error("Erro ao carregar dados do formulário", { description: String(error) })
      } finally {
        // Atualizar estados de carregamento
        setIsLoadingCategories(false)
        setIsLoadingTeachers(false)
      }
    }

    fetchData()
  }, [])

  /** Definição do formulário. */
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema), // Usar schema para validação
    defaultValues: {
      // valores padrão do formulário
      name: activity?.name ?? "",
      category: activity?.category ?? "",
      description: activity?.description ?? "",
      maxParticipants: activity?.maxParticipants ?? 20,
      teacher: activity?.teacher ?? "",
      coverImg: activity?.coverImg ?? "",
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
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center md:text-start">{type === "create" ? "Adicionar Atividade" : "Editar Atividade"}</h1>
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
                <FormControl>
                  <Combobox options={categories} value={field.value} onValueChange={field.onChange} placeholder={isLoadingCategories ? "Carregando categorias..." : "Selecione uma categoria..."} searchPlaceholder="Buscar categoria..." emptyMessage="Nenhuma categoria encontrada." disabled={isLoadingCategories} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantidade de participantes */}
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade máxima de participantes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Entre 15 a 40 alunos"
                    min={15}
                    max={40}
                    step={1}
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Garantir que o valor seja um número
                  />
                </FormControl>
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
                <FormControl>
                  <Combobox options={teachers} value={field.value} onValueChange={field.onChange} placeholder={isLoadingTeachers ? "Carregando professores..." : "Selecione um professor..."} searchPlaceholder="Buscar professor..." emptyMessage="Nenhum professor encontrado." disabled={isLoadingTeachers} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Imagem */}

          {/* Botão de enviar */}
          <Button type="submit" className="mt-5 max-md:w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <LoaderCircleIcon className="animate-spin" />} {/* Ícone de carregamento */}
            <PlusIcon />
            Adicionar Atividade
          </Button>
        </form>
      </Form>
    </section>
  )
}
