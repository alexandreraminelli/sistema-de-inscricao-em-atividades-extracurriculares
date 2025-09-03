import DeleteActivityButton from "@/components/custom/button/DeleteActivityButton"
import ScheduleCard from "@/components/custom/schedule/ScheduleCard"
import EnrollmentDialogButton from "@/components/custom/enrollment/EnrollmentDialogButton"
import ErrorMessage from "@/components/custom/ErrorMessage"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { db } from "@/database/drizzle"
import { activity as activityDb, category as categoryDb, teacher, users } from "@/database/schema"
import { authOptions } from "@/lib/auth"
import { UserRole } from "@/types/auth/UserRole"
import { eq } from "drizzle-orm"
import { ClipboardCheckIcon, PencilIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"

/** Parâmetros da rota dinâmica de `ActivityInfoPage`. */
interface Params {
  params: Promise<{
    /** ID da atividade. */
    id: string
  }>
}
/** Página de informações da atividade extracurricular. */
export default async function ActivityInfoPage({ params }: Params) {
  try {
    // Desestruturar parâmetros da rota dinâmica
    const { id } = await params

    // Obter dados do DB
    const [activity] = await db.select().from(activityDb).where(eq(activityDb.id, id)).limit(1)
    if (!activity) return <ErrorMessage title="Atividade Não Encontrada" message={["Não foi possível carregar a atividade que você está procurando. Ela pode não existir ou não estar mais disponível", "Tente novamente mais tarde ou navegue pela lista de atividades oferecidas."]} /> // se não encontrar atividade

    const [category] = await db.select().from(categoryDb).where(eq(categoryDb.id, activity.category)).limit(1)
    // Dados do professor
    const [teacherUser] = await db.select().from(users).where(eq(users.id, activity.teacher)).limit(1)
    const [teacherData] = await db.select().from(teacher).where(eq(teacher.id, activity.teacher)).limit(1)

    // Obter sessão do usuário
    const session = await getServerSession(authOptions)
    const userRole = session?.user?.role as UserRole

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

        <main className="my-4 md:ms-4 flex items-center md:items-start justify-between flex-col-reverse md:flex-row gap-x-4 gap-y-8 xl:gap-x-8">
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
                <h3 className="font-semibold text-xl md:text-2xl">Aplicador: {teacherUser.name}</h3>
                {/* Descrição do aplicador */}
                <p>{teacherData.description}</p>
              </section>
            </Card>
          </article>
          {/* Resumo rápido e botões de ação */}
          <aside className="h-fit md:sticky top-16 space-y-5">
            {/* Resumo */}
            <SummaryCard activity={activity} teacher={teacherUser} category={category} userRole={userRole} />
            {/* Horários */}
            <ScheduleCard activity={activity} userRole={userRole} />
          </aside>
        </main>
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar atividade:", error)
    return <ErrorMessage image="/images/illustrations/sem-resultados.svg" title="Atividade Não Encontrada" message={["A atividade que você está procurando não foi encontrada ou não está mais disponível.", "Confira se o endereço está correto ou navegue pela lista de atividades disponíveis."]} />
  }
}

/** Props de `SummaryCard`. */
interface SummaryCardProps {
  activity: typeof activityDb.$inferSelect
  category: typeof categoryDb.$inferSelect
  teacher: typeof users.$inferSelect

  userRole: UserRole
}
/** Card de resumo da atividade. */
function SummaryCard({ activity, category, teacher, userRole }: SummaryCardProps) {
  /** Informações de resumo da atividade. */
  const activityResume = [
    { title: "Categoria", value: category.name },
    { title: "Aplicador", value: teacher.name },
    { title: "Máx. de Participantes", value: activity.maxParticipants },
  ]
  return (
    <Card className="p-6 max-md:mx-auto w-full h-fit items-center flex-col gap-3 text-center">
      <CardHeader className="p-0 m-0 w-full">
        <CardTitle className="text-lg leading-5">{activity.name}</CardTitle>
      </CardHeader>
      <Separator />
      {/* Resumo */}
      <CardContent className="p-0 m-0 w-full flex flex-row md:flex-col flex-wrap gap-2.5 md:gap-4 *:flex-1">
        {activityResume.map((item) => (
          <div key={item.title} className="min-w-40">
            <h3 className="font-medium text-base">{item.title}</h3>
            <p className="font-light text-sm">{item.value}</p>
          </div>
        ))}
      </CardContent>
      <Separator />
      {/* Botões de ação pra atividade */}
      <CardFooter className="p-0 m-0 w-full flex-row flex-wrap items-center gap-4 *:flex-1">
        {/* Botões pro aluno */}
        {userRole === "student" && (
          <>
            {/*Botão de inscrição */}
            <EnrollmentDialogButton activity={activity} />
          </>
        )}
        {/* Botões pro professor */}
        {userRole === "teacher" && (
          <>
            {/* Opção de editar */}
            <Button variant="default" asChild>
              <Link href={`/atividades/${activity.id}/editar`}>
                <PencilIcon />
                Editar
              </Link>
            </Button>
            {/* Botão de excluir */}
            <DeleteActivityButton activity={activity} />
          </>
        )}
      </CardFooter>
    </Card>
  )
}
