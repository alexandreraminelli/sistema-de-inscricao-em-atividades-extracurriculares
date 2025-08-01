import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { db } from "@/database/drizzle"
import { activity, category } from "@/database/schema"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

/** Página de atividades. */
export default async function AtividadesPage() {
  // Obter sessão do usuário
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role

  // Categorias
  const categories = await db.select().from(category).orderBy(category.name)
  // Atividades
  const activities = await db.select().from(activity)
  // Agrupar atividades por categoria
  const activitiesByCategory = categories.map((category) => ({
    category: category,
    activities: activities.filter((activity) => activity.category === category.id),
  }))

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

        {/* Listar atividades por categorias */}
        <section>
          <Accordion type="multiple">
            {activitiesByCategory.map(({ category, activities }) => (
              <AccordionItem key={category.id} value={category.id}>
                {/* Título da categoria */}
                <AccordionTrigger>
                  <h3 className="text-lg">{category.name}</h3>
                </AccordionTrigger>
                {/* Atividades da categoria */}
                <AccordionContent>
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      // Card de atividade
                      <div key={activity.id}>{activity.name}</div>
                    ))
                  ) : (
                    // Se não houver atividades
                    <p className="text-muted-foreground">Sem atividades.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  )
}
