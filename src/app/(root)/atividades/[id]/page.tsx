import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { db } from "@/database/drizzle"
import { activity as activityDb, category, category as categoryDb, users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { ClipboardCheckIcon } from "lucide-react"

/** Parâmetros da rota dinâmica de `ActivityInfoPage`. */
interface Params {
  params: {
    /** ID da atividade. */
    id: string
  }
}
/** Página de informações da atividade extracurricular. */
export default async function ActivityInfoPage({ params: { id } }: Params) {
  // Obter dados do DB
  const [activity] = await db.select().from(activityDb).where(eq(activityDb.id, id)).limit(1)
  const [category] = await db.select().from(categoryDb).where(eq(categoryDb.id, activity.category)).limit(1)
  const [teacher] = await db.select().from(users).where(eq(users.id, activity.teacher)).limit(1)

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
          <BreadcrumbItem>{category.name}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{activity.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="my-4 md:ms-4 flex items-center md:items-start justify-between flex-col-reverse md:flex-row gap-10">
        {/* Descrição da atividade */}
        <article className="max-w-5xl space-y-6">
          {/* Título */}
          <header>
            <h1 className="mb-4 md:mb-6 font-semibold text-2xl sm:text-3xl md:text-4xl text-center md:text-start">{activity.name}</h1>
          </header>
          {/* Descrição */}
          <section className="space-y-4 text-justify text-foreground/90">
            {activity.description.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
          {/* Dados do aplicador */}
          <Card className="p-6">
            <section className="space-y-3">
              {/* Nome do aplicador */}
              <h3 className="font-semibold text-xl md:text-2xl">Aplicador: {teacher.name}</h3>
              {/* Descrição do aplicador */}
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, quod impedit excepturi cupiditate, deserunt aspernatur assumenda eveniet odio itaque est quam dicta voluptate vitae porro perferendis qui enim. Aperiam, numquam.</p>
            </section>
          </Card>
        </article>
        {/* Resumo rápido e botões de ação */}
        <aside className="md:sticky top-16">
          <SummaryCard activity={activity} teacher={teacher} category={category} />
        </aside>
      </main>
    </div>
  )
}

/** Props de `SummaryCard`. */
interface SummaryCardProps {
  activity: typeof activityDb.$inferSelect
  category: typeof categoryDb.$inferSelect
  teacher: typeof users.$inferSelect
}
/** Card de resumo da atividade. */
function SummaryCard({ activity, category, teacher }: SummaryCardProps) {
  /** Informações de resumo da atividade. */
  const activityResume = [
    { title: "Categoria", value: category.name },
    { title: "Aplicador", value: teacher.name },
    { title: "Máx. de Participantes", value: "N/A" },
  ]

  return (
    <Card className="p-6 h-fit items-center flex-col max-md:w-full gap-4">
      {/* Resumo */}
      {activityResume.map((item) => (
        <div key={item.title} className="text-center">
          <h3 className="font-medium text-base">{item.title}</h3>
          <p className="font-light text-sm">{item.value}</p>
        </div>
      ))}
      <Separator />
      {/* Opção de se inscrever */}
      <Button variant="default" disabled>
        <ClipboardCheckIcon />
        Inscrever-se
      </Button>
    </Card>
  )
}
