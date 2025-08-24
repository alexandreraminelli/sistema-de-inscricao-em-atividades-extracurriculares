"use client"

import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { activity as activityDb, session as sessionDb } from "@/database/schema"
import { createSession } from "@/lib/actions/activitySession"
import { sessionSchema } from "@/schemas/sessionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon, PlusIcon, SaveIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

/** Props de `SessionForm`. */
interface Props {
  /** Tipo de formulário (criação ou edição). */
  type: "create" | "edit"
  /** Atividade do horário. */
  activity: typeof activityDb.$inferSelect
  /** Horário a ser editado. */
  session?: typeof sessionDb.$inferSelect

  /** Se for um dialog */
  inDialog?: boolean
}

/** Formulário de criação/edição de horários de atividades. */
export default function SessionForm({ type, activity, session, inDialog }: Props) {
  /** Valores originais do form para comparação e destaque das alterações. */
  const [originalValues, setOriginalValues] = useState(() => ({
    activity: activity.id,
    dayOfWeek: session?.dayWeek ?? undefined,
    time: session?.time ?? undefined,
    classroom: session?.classroom ?? "",
  }))

  /** Definição do formulário. */
  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: originalValues,
  })

  /** Função para enviar o formulário. */
  const onSubmit = async (values: z.infer<typeof sessionSchema>) => {
    let result
    if (type === "create") {
      // Criar novo horário
      result = await createSession(values)
    } else {
      // Atualizar horário
    }

    const operationName = type === "create" ? "criada" : "atualizada"
    if (result?.success) {
      /* Sucesso */
      if (type === "edit") {
        // Atualizar valores originais (se for edição)
        setOriginalValues({
          activity: activity.id,
          dayOfWeek: values.dayWeek,
          time: values.time,
          classroom: values.classroom || "",
        })
      }

      // Notificação de sucesso
      toast.success(`Horário ${operationName} com sucesso!`, {
        description: `O horário da atividade '${activity.name}' foi ${operationName}.`,
      })
      // Limpar form de criação
      if (type === "create") form.reset()
    }
  }

  // Componente
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Dia da semana da atividade */}
        <FormField
          control={form.control}
          name="dayWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia da Semana</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um dia da semana" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionDb.dayWeek.enumValues.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Horário da atividade */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário da Atividade</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionDb.time.enumValues.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Sala da atividade */}
        <FormField
          control={form.control}
          name="classroom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sala da atividade</FormLabel>
              <FormControl>
                <Input placeholder="Ex: U15, P20, W503, etc." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Footer do Dialog */}
        {inDialog && (
          <DialogFooter>
            {/* Fechar dialog */}
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {/* Submeter form */}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <LoaderCircleIcon className="animate-spin" />} {/* Ícone de carregamento */}
              {type === "create" ? (
                <>
                  <PlusIcon /> Adicionar Horário
                </>
              ) : (
                <>
                  <SaveIcon /> Salvar Alterações
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  )
}
