import Logo from "@/components/custom/Logo"
import Image from "next/image"

/** Página de login. */
export default function LoginPage() {
  return (
    <div
      className="flex flex-col w-dvw h-dvh
        align-center
        py-4 px-2.5"
    >
      {/* Conteúdo da página */}
      <div className="flex flex-col h-full">
        <header className="flex flex-col items-center md:items-start gap-14">
          {/* Logo */}
          <Logo />

          {/* Título e subtítulo */}
          <div className="space-y-4 text-center md:text-start">
            <h1 className="text-3xl sm:text-4xl font-semibold">Acesse sua conta</h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">Entre para visualizar e se inscrever em atividades extracurriculares</p>
          </div>
        </header>

        {/* Form */}
        <main>Formulário de login</main>

        <aside className="flex flex-col items-center justify-end h-full gap-7">
          {/* Imagem decorativa */}
          <Image src="/images/login-bg.jpg" alt="Fachada da universidade" width={360} height={278} className="rounded-xl shadow-lg" />

          {/* Problemas */}
          <p className="text-sm text-center text-slate-600 dark:text-slate-400 m-2">
            Está tendo problemas para acessar? <br />
            Entre em contato com o suporte da faculdade.
          </p>
        </aside>
      </div>
    </div>
  )
}
