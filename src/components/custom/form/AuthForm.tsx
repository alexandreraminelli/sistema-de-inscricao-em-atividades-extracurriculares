"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import config from "@/lib/config"
import { loginSchema } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle, UserPlusIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import PasswordInput from "./PasswordInput"
import { SignInResult, SignUpResult } from "@/lib/actions/auth"

/** Props de `AuthForm`. */
interface Props {
  /** Tipo de formulário (sign-in ou sign-up). */
  type: "sign-in" | "sign-up"
  /** Função executada ao enviar o formulário. */
  onSubmit: (data: z.infer<typeof loginSchema>) => Promise<SignUpResult | SignInResult>
}
/** Formulário de autenticação do aplicativo.
 * @param onSubmit Função executada ao enviar o formulário.
 */
export default function AuthForm({ type, onSubmit }: Props) {
  const router = useRouter()
  /** Se formulário é de cadastro. */
  const isSignUp = type === "sign-up"

  /** Definição do formulário. */
  const form: UseFormReturn<z.infer<typeof loginSchema>> = useForm({
    resolver: zodResolver(loginSchema), // Usar schema para validação
    defaultValues: { email: "", password: "" },
  })

  /** Função executada ao submeter o formulário. */
  const handleSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    console.log("Valores enviados:\n", data) // DEBUG

    // Validar credenciais no servidor
    const result = await onSubmit(data)

    if (result.success) {
      /* Credenciais válidas - agora fazer login com NextAuth */
      try {
        const authResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (authResult?.error) {
          toast.error("Erro ao autenticar.", { description: authResult.error })
        } else {
          // Login bem-sucedido
          toast.success("Login realizado com sucesso!")
          // Redirecionar para a página inicial
          router.push("/")
        }
      } catch (error) {
        toast.error("Erro ao autenticar.", { description: String(error) })
      }
    } else {
      /* Login falhou */
      // Notificação de erro
      toast.error("Erro ao realizar o login.", { description: result.error || "Verifique suas credenciais e tente novamente." })
    }
  }

  // Componente
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)} // Função para lidar com o envio
        className="space-y-7"
      >
        <div className="space-y-4">
          {/* Campo nome */}
          {isSignUp && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nome completo" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* Campo e-mail */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={`usuario${config.emailDomain}`} autoComplete="email" {...field} />
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
                  <PasswordInput placeholder="Mesma senha usada no portal universitário" {...field} autoComplete={isSignUp ? "new-password" : "current-password"} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Botão de enviar */}
        <Button size="lg" className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />} {/* Ícone de carregamento */}
          {isSignUp ? "Criar conta" : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}
