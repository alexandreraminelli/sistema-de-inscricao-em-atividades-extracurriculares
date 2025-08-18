"use client"

import ButtonWithAlertDialog, { ButtonWithAlertDialogProps } from "@/components/custom/button/ButtonWithAlertDialog"
import { Button } from "@/components/ui/button"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { activity as activityDb } from "@/database/schema"
import { createActivity, deleteActivity, updateActivity } from "@/lib/actions/activity"
import { cn } from "@/lib/utils"
import { activitySchema } from "@/schemas/activitySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { EraserIcon, LoaderCircleIcon, PlusIcon, SaveIcon, Trash2Icon } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z, { set } from "zod"

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

  /** Valores originais do form para comparação e destaque das alterações. */
  const [originalValues, setOriginalValues] = useState(() => ({
    name: activity?.name ?? "",
    category: activity?.category ?? "",
    description: activity?.description ?? "",
    maxParticipants: activity?.maxParticipants ?? 20,
    teacher: activity?.teacher ?? "",
    coverImg: activity?.coverImg ?? "",
  }))

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
    defaultValues: originalValues,
  })

  /** Função para verificar se um campo foi alterado. */
  const isFieldChanged = (fieldName: keyof typeof originalValues) => {
    const currentValue = form.watch(fieldName) // Obter valor atual do field
    return currentValue !== originalValues[fieldName] // Comparar com o valor original
  }
  /** Função para obter classes CSS para campos alterados. */
  const getFieldClasses = (fieldName: keyof typeof originalValues) => {
    if (type === "create") return "" // não afetar campos em form de criação
    return isFieldChanged(fieldName)
      ? "ring-2 ring-green-700 border-green-700 dark:border-green-400 bg-green-50 dark:bg-green-950/20" // estilo para campos alterados
      : ""
  }
  /** Função para obter classes CSS para label de campos alterados. */
  const getLabelClasses = (fieldName: keyof typeof originalValues) => {
    if (type === "create") return ""
    return isFieldChanged(fieldName)
      ? "text-green-700 dark:text-green-400" // estilo para label de campos alterados
      : ""
  }
  /** Função para verificar se há algum campo alterado para controlar o botão de salvar alterações (apenas form de edição). */
  const hasChanges = useMemo(() => {
    if (type === "create") return true // sempre habilitado para criação
    return Object.keys(originalValues).some((key) => {
      const fieldKey = key as keyof typeof originalValues
      return form.watch(fieldKey) !== originalValues[fieldKey]
    })
  }, [form.watch(), originalValues, type])

  /** Função para enviar o formulário. */
  const onSubmit = async (values: z.infer<typeof activitySchema>) => {
    let result
    if (type === "create") result = await createActivity(values)
    else {
      // atualizar somente os campos alterados
      const changedFields: Partial<typeof activityDb.$inferInsert> = {}
      Object.keys(originalValues).forEach((key) => {
        const fieldKey = key as keyof typeof originalValues
        if (values[fieldKey] !== originalValues[fieldKey]) {
          changedFields[fieldKey] = values[fieldKey] as any
        }
      })

      result = await updateActivity(activity?.id!, changedFields)
    }

    const operationName = type === "create" ? "criada" : "atualizada"

    // Atividade criada com sucesso
    if (result.success) {
      // Atualizar originalValues
      if (type === "edit")
        setOriginalValues({
          name: result.data.name,
          category: result.data.category,
          description: result.data.description,
          maxParticipants: result.data.maxParticipants,
          teacher: result.data.teacher,
          coverImg: result.data.coverImg || "",
        })

      // Notificação de sucesso
      toast.success(`Atividade ${operationName} com sucesso!`, {
        description: `Atividade '${result.data.name}' ${operationName}.`,
        action: {
          // botão para abrir página da atividade
          label: "Ver atividade",
          onClick: () => router.push(`/atividades/${result.data.id}`),
        },
      })
      // Limpar form de criação
      if (type === "create") form.reset()
    }
    // Erro ao criar atividade
    else toast.error(`Erro ao ${type === "create" ? "criar" : "atualizar"} atividade!`, { description: result.message })
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
                <FormLabel className={cn(getLabelClasses("name"))}>Nome da atividade</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome da atividade" className={cn(getFieldClasses("name"))} {...field} />
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
                <FormLabel className={cn(getLabelClasses("category"))}>Categoria</FormLabel>
                <FormControl>
                  <Combobox options={categories} value={field.value} onValueChange={field.onChange} placeholder={isLoadingCategories ? "Carregando categorias..." : "Selecione uma categoria..."} searchPlaceholder="Buscar categoria..." emptyMessage="Nenhuma categoria encontrada." className={cn(getFieldClasses("category"))} disabled={isLoadingCategories} />
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
                <FormLabel className={cn(getLabelClasses("maxParticipants"))}>Quantidade máxima de participantes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Entre 15 a 40 alunos" min={15} max={40} step={1} {...field} value={field.value} onChange={(e) => field.onChange(Number(e.target.value)) /* garantir que valor seja um número */} className={cn(getFieldClasses("maxParticipants"))} />
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
                <FormLabel className={cn(getLabelClasses("description"))}>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição da atividade. Objetivos, competências desenvolvidas, tópicos abordados, etc." className={cn(getFieldClasses("description"))} {...field} />
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
                <FormLabel className={cn(getLabelClasses("teacher"))}>Aplicador</FormLabel>
                <FormControl>
                  <Combobox options={teachers} value={field.value} onValueChange={field.onChange} placeholder={isLoadingTeachers ? "Carregando professores..." : "Selecione um professor..."} searchPlaceholder="Buscar professor..." emptyMessage="Nenhum professor encontrado." disabled={isLoadingTeachers} className={cn(getFieldClasses("teacher"))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Imagem */}

          <footer className="mt-5 flex flex-row flex-wrap items-center gap-4 *:flex-1">
            {/* Botão de enviar */}
            <Button type="submit" className="max-md:w-full" disabled={form.formState.isSubmitting || (type === "edit" && !hasChanges)}>
              {form.formState.isSubmitting && <LoaderCircleIcon className="animate-spin" />} {/* Ícone de carregamento */}
              {type === "create" ? (
                <>
                  <PlusIcon />
                  Adicionar Atividade
                </>
              ) : (
                <>
                  <SaveIcon />
                  Salvar Alterações
                </>
              )}
            </Button>
            {/* Botões para edição */}
            {type === "edit" && <EditButtons form={form} activity={activity!} />}
          </footer>
        </form>
      </Form>
    </section>
  )
}

/** Botões para edição. */
function EditButtons({ form, activity }: { form: ReturnType<typeof useForm<z.infer<typeof activitySchema>>>; activity: typeof activityDb.$inferSelect }) {
  /** Botões de edição. */
  const buttons: ButtonWithAlertDialogProps[] = [
    {
      button: {
        // descartar alterações
        type: "reset",
        variant: "secondary",
        text: "Descartar alterações",
        Icon: EraserIcon,
      },
      alertDialog: { title: "Descartar alterações", description: "Tem certeza que deseja descartar as alterações feitas neste formulário? Todas as informações não salvas serão perdidas.", onAction: () => form.reset() },
    },
    {
      button: {
        // deletar atividade
        type: "button",
        variant: "destructive",
        text: "Excluir atividade",
        Icon: Trash2Icon,
      },
      alertDialog: {
        title: "Excluir atividade",
        description: "Tem certeza que deseja excluir essa atividade? Essa ação não pode ser desfeita.",
        onAction: async () => {
          const result = await deleteActivity(activity.id)
          if (result.success) {
            // Se der certo
            toast.success("Atividade excluída com sucesso!", { description: `A atividade '${activity.name}' foi excluída.` })
            redirect("/atividades")
          } else {
            // Se der erro
            toast.error("Erro ao excluir atividade!", { description: result.message })
          }
        },
      },
    },
  ]

  return (
    <>
      {buttons.map((button, index) => (
        <ButtonWithAlertDialog key={index} button={button.button} alertDialog={button.alertDialog} />
      ))}
    </>
  )
}
