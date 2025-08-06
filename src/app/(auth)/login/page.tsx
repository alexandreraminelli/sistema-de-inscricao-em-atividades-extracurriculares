import AuthForm from "@/components/custom/form/AuthForm"
import Logo from "@/components/custom/Logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { signInWithCredentials, signUp } from "@/lib/actions/auth"
import { UserPlusIcon } from "lucide-react"
import Image from "next/image"

/** Página de login. */
export default function LoginPage() {
  return (
    <div
      className="flex flex-row w-dvw h-dvh justify-between
        py-4 md:py-3 px-[5vw] md:px-3 gap-3.5"
    >
      {/* Conteúdo da página */}
      <div className="flex flex-col h-full w-full md:px-14 md:py-1.5 ">
        <header className="flex flex-col items-center md:items-start gap-14 mb-6">
          {/* Logo */}
          <Logo className="w-fit mx-auto h-10 md:h-11 lg:h-12" />

          {/* Título e subtítulo */}
          <div className="space-y-4 text-center md:text-start">
            <h1 className="text-3xl sm:text-4xl font-semibold">Acesse sua conta</h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">Entre para visualizar e se inscrever em atividades extracurriculares</p>
          </div>
        </header>

        {/* Form */}
        <main className="space-y-4">
          <AuthForm type="sign-in" onSubmit={signInWithCredentials} />
          {/* Botão de adicionar usuário (apenas para ambiente de desenvolvimento) */}
          {process.env.NODE_ENV === "development" && (
            <Sheet>
              <SheetTrigger className="w-full" asChild>
                <Button variant="secondary" className="w-full">
                  <UserPlusIcon /> Adicionar Usuário
                </Button>
              </SheetTrigger>
              {/* Sheet com form de criar conta */}
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Adicionar Usuário</SheetTitle>
                  <SheetDescription>Adicione um novo usuário no sistema para fins de teste (somente no modo de desenvolvimento).</SheetDescription>
                </SheetHeader>
                {/* Form de adicionar usuário */}
                <section className="px-4">
                  <AuthForm type="sign-up" onSubmit={signUp} />
                </section>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="destructive">Cancelar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
        </main>

        <footer className="flex flex-col items-center justify-end h-full">
          {/* Problemas */}
          <p className="text-sm text-center text-slate-600 dark:text-slate-400 my-2 lg:mx-2 object-cover">
            Está tendo problemas para acessar? <br />
            Entre em contato com o suporte da faculdade.
          </p>
        </footer>
      </div>

      {/* Imagem desktop */}
      <Image
        src="/images/login-bg.jpg"
        alt="Fachada da universidade"
        width={626}
        height={812}
        className="rounded-xl rounded-bl-4xl shadow-lg 
        object-cover transition-all max-md:hidden max-lg:w-2/5 lg:w-1/2"
      />
    </div>
  )
}
