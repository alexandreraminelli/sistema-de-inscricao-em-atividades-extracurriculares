import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { db } from "@/database/drizzle"
import { category } from "@/database/schema"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

/** Página de atividades. */
export default async function AtividadesPage() {
  // Obter sessão do usuário
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role

  // Categorias
  const categories = await db.select().from(category).orderBy(category.name)

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb className="my-3.5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Atividades Extracurriculares</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Conteúdo */}
      <main className="space-y-4">
        {/* Título */}
        <header className="space-y-1 text-center md:text-justify">
          <h2 className="font-semibold text-3xl">Atividades Oferecidas</h2>
          <p className="text-sm md:text-base text-muted-foreground">Veja as atividades extracurriculares abertas para inscrição e escolha as que mais combinam com você.</p>
        </header>

        {/* Teste categorias */}
        <section>
          {categories.map((cat) => (
            <p>{cat.name}</p>
          ))}
        </section>
      </main>
    </div>
  )
}
