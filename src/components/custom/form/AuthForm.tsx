"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { users } from "@/database/schema"
import { SignInResult, SignUpResult } from "@/lib/actions/auth"
import config from "@/lib/config"
import { signInSchema, signUpSchema } from "@/schemas/loginSchema"
import { roleLabels } from "@/types/auth/UserRole"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import PasswordInput from "./PasswordInput"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

/** Tipagem dos dados do form de login. */
type SignInFormData = z.infer<typeof signInSchema>
/** Tipagem dos dados do form de cadastro. */
type SignUpFormData = z.infer<typeof signUpSchema>
/** Tipagem do form (Union Type). */
type FormData = SignInFormData | SignUpFormData

/** Props de `AuthForm`. */
type Props =
  | {
      /** Tipo de formulário (sign-in ou sign-up). */
      type: "sign-in"
      /** Função executada ao enviar o formulário. */
      onSubmit: (data: z.infer<typeof signInSchema>) => Promise<SignUpResult | SignInResult>
    }
  | {
      /** Tipo de formulário (sign-in ou sign-up). */
      type: "sign-up"
      /** Função executada ao enviar o formulário. */
      onSubmit: (data: z.infer<typeof signUpSchema>) => Promise<SignUpResult | SignInResult>
    }
/**
 * Formulário de autenticação do aplicativo.
 * @param onSubmit Função executada ao enviar o formulário.
 */
export default function AuthForm({ type, onSubmit }: Props) {
  const router = useRouter()
  /** Se formulário é de cadastro. */
  const isSignUp = type === "sign-up"
  /** Zod schema para validação do formulário. */
  const authSchema = isSignUp ? signUpSchema : signInSchema

  /** Definição do formulário. */
  const form = useForm<FormData>({
    resolver: zodResolver(authSchema), // Usar schema para validação
    defaultValues: isSignUp ? { email: "", password: "", name: "", role: undefined } : { email: "", password: "" },
  })

  /** Observar valor do campo "role". */
  const watchedRole = useWatch({
    control: form.control,
    name: "role",
  })

  /** Função executada ao submeter o formulário. */
  const handleSubmit: SubmitHandler<z.infer<typeof authSchema>> = async (data) => {
    // Validar credenciais no servidor
    const result = await onSubmit(data as any)

    if (result.success) {
      if (isSignUp) {
        // Para cadastro: mostrar notificação de sucesso
        toast.success("Conta criada com sucesso!", { description: "Você já pode fazer login." })
        form.reset() // limpar form
      } else {
        // Para login: autenticar com NextAuth
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
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo tipo de usuário */}
          {isSignUp && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de usuário</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.role.enumValues.map((role) => (
                          <SelectItem key={role} value={role}>
                            {roleLabels[role]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Campos para aluno */}
          {isSignUp && watchedRole === "student" && (
            <>
              {/* RA do aluno */}
              <FormField
                control={form.control}
                name="enrollment_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RA (Registro do Aluno)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Ex: 12.34567-8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Campos para professor */}
          {isSignUp && watchedRole === "teacher" && (
            <>
              {/* Se é admin */}
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row">
                    <FormLabel>Administrador</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
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
