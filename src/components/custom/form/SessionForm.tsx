"use client"

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { activity as activityDb, session as sessionDb } from "@/database/schema"
import { sessionSchema } from "@/schemas/sessionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
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
    startTime: session?.startTime ?? undefined,
    endTime: session?.endTime ?? undefined,
  }))

  /** Definição do formulário. */
  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: originalValues,
  })

  // Componente
  return (
    <Form {...form}>
      <form>
        {/* Dia da semana da atividade */}
        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia da Semana</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
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
        {/* Hora de início */}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário de Início</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um horário de início" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionDb.startTime.enumValues.map((time) => (
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
        {/* Hora de término */}
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário de Término</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um horário de término" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionDb.startTime.enumValues.map((time) => (
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
