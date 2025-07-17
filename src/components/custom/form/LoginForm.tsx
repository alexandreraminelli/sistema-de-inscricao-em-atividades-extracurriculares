"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"
import config from "@/lib/config"
import PasswordInput from "./PasswordInput"

/**
 * Formulário de login do aplicativo.
 */
export default function LoginForm<T extends FieldValues>() {
  /** Definição do formulário. */
  const form: UseFormReturn<z.infer<typeof loginSchema>> = useForm({
    resolver: zodResolver(loginSchema), // Usar schema para validação
    defaultValues: { email: "", password: "" },
  })

  /** Função executada ao submeter o formulário. */
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Valores enviados:", values) // DEBUG
  }

  // Componente
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Função para lidar com o envio
        className="space-y-7"
      >
        <div className="space-y-4">
          {/* Campo e-mail */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={`usuario${config.emailDomain}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Mesma senha usada no portal universitário" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Botão de enviar */}
        <Button size="lg" className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
