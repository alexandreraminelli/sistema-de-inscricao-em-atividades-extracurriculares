import ScheduleCard from "@/components/custom/cards/ScheduleCard"
import ErrorMessage from "@/components/custom/ErrorMessage"
import ActivityForm from "@/components/custom/form/ActivityForm"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { db } from "@/database/drizzle"
import { activity as activityDb, category as categoryDb } from "@/database/schema"
import { eq } from "drizzle-orm"

/** Parâmetros da rota dinâmica de `ActivityInfoPage`. */
interface Params {
  params: Promise<{
    /** ID da atividade. */
    id: string
  }>
}
/** Página de editar atividades. */
export default async function EditActivityPage({ params }: Params) {
  // Desestruturar parâmetros da rota dinâmica
  const { id } = await params

  // Obter dados do DB
  const [activity] = await db.select().from(activityDb).where(eq(activityDb.id, id)).limit(1)
  if (!activity) return <ErrorMessage title="Atividade Não Encontrada" message={["Não foi possível carregar a atividade que você está procurando. Ela pode não existir ou não estar mais disponível", "Tente novamente mais tarde ou navegue pela lista de atividades oferecidas."]} /> // se não encontrar atividade
  // Carregar categoria
  const [category] = await db.select().from(categoryDb).where(eq(categoryDb.id, activity.category)).limit(1)

  return (
    <>
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
            <BreadcrumbLink href={`/atividades/${id}`}>{activity.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 justify-between">
        {/* Formulário */}
        <main className="w-full max-w-4xl md:min-w-2/3 lg:min-w-xl">
          <ActivityForm type="edit" activity={activity} />
        </main>
        {/* Imagem */}
        <aside className="self-center w-full md:max-w-xs md:self-start md:sticky top-16">
          {/* Horários da atividade */}
          <ScheduleCard activity={activity} userRole="teacher" />
        </aside>
      </div>
    </>
  )
}
