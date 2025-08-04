import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { db } from "@/database/drizzle"
import { activity as activityDb, category as categoryDb } from "@/database/schema"
import { eq } from "drizzle-orm"

/** Parâmetros da rota dinâmica de `ActivityInfoPage`. */
interface Params {
  params: {
    /** ID da atividade. */
    id: string
  }
}
/** Página de informações da atividade extracurricular. */
export default async function ActivityInfoPage({ params }: Params) {
  // Desestruturar parâmetros da rota dinâmica
  const { id } = params

  // Obter dados do DB
  const [activity] = await db.select().from(activityDb).where(eq(activityDb.id, id)).limit(1)
  const [category] = await db.select().from(categoryDb).where(eq(categoryDb.id, activity.category)).limit(1)

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
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{activity.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Teste */}
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
    </div>
  )
}
