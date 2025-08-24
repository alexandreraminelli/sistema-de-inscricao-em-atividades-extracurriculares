"use client"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { activity as activityDb, session as sessionDb } from "@/database/schema"
import { createSession } from "@/lib/actions/activitySession"
import { sessionSchema } from "@/schemas/sessionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
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
}

/** Formulário de criação/edição de horários de atividades. */
export default function SessionForm({ type, activity, session }: Props) {
  /** Valores originais do form para comparação e destaque das alterações. */
  const [originalValues, setOriginalValues] = useState(() => ({
    dayOfWeek: session?.dayWeek ?? undefined,
    time: session?.time ?? undefined,
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
          dayOfWeek: values.dayWeek,
          time: values.time,
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
      </form>
    </Form>
  )
}
