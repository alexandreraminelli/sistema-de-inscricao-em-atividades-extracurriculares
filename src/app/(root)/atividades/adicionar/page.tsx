import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@/types/auth/authCredentials"
import { getServerSession } from "next-auth"
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
    </div>
  )
}
