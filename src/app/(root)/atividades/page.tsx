import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { db } from "@/database/drizzle"
import { activity, category } from "@/database/schema"
import { authOptions } from "@/lib/auth"
import { ClipboardCheckIcon, SquareArrowOutUpRightIcon } from "lucide-react"
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
                <AccordionContent className="space-y-3.5">
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      // Card de atividade
                      <ActivityCard key={activity.id} activity={activity} />
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

/** Props de ` */
interface ActivityCardProps extends React.ComponentProps<typeof Card> {
  /** Atividade do card. */
  activity: typeof activity.$inferSelect
}

/** Card de atividade. */
function ActivityCard({ activity, className, ...props }: ActivityCardProps) {
  return (
    <Card
      className="px-2.5 md:px-3.5 justify-between
      flex-col items-center 
      md:flex-row md:items-start"
    >
      {/* Nome da atividade */}
      <span className="text-center">{activity.name}</span>

      {/* Botões de ação */}
      <div className="flex flex-row items-center gap-3">
        {/* Botão de abrir página */}
        <Button variant="outline">
          <SquareArrowOutUpRightIcon /> Veja mais
        </Button>
        {/* Botão de inscrição */}
        <Button variant="default" disabled>
          <ClipboardCheckIcon />
          Inscrever
        </Button>
      </div>
    </Card>
  )
}
