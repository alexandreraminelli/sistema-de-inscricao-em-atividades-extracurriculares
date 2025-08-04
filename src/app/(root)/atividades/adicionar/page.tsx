import ActivityForm from "@/components/custom/form/ActivityForm"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@/types/auth/authCredentials"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"

/** Página de criar atividade. */
export default async function CreateActivityPage() {
  // Obter sessão
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role as UserRole
  // Redirecionar usuários que não são professores
  if (userRole !== "teacher") redirect("/atividades")

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/atividades">Atividades Extracurriculares</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Adicionar Atividade</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row gap-5 lg:gap-10  justify-between">
        {/* Formulário */}
        <main className="w-full max-w-4xl md:min-w-2/3 lg:min-w-xl">
          <ActivityForm type="create" />
        </main>
        {/* Imagem */}
        <aside className="self-center">
          <Image src="/images/illustrations/atividades.svg" alt="Ilustração de atividades" width={752} height={556} className="object-cover" />
        </aside>
      </div>
    </div>
  )
}
