import ErrorMessage from "@/components/custom/ErrorMessage"
import { db } from "@/database/drizzle"
import { enrollment } from "@/database/schema"
import { authOptions } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"

/** Página de inscrições do aluno. */
export default async function InscricoesPage() {
  // Obter sessão do usuário
  const session = await getServerSession(authOptions)

  // Obter lista de inscrições do aluno
  const enrollments = await db.select().from(enrollment).where(eq(enrollment.student, session?.user?.id!))

  // Se não houver inscrições
  if (enrollments.length == 0) {
    return <ErrorMessage image="/images/illustrations/sem-resultados.svg" title="Nenhuma Inscrição" message={["Você ainda não se inscreveu em nenhuma atividade."]} />
  }
  return (
    <div className="space-y-4">
      <header className="md:ms-4">
        <h1 className="font-semibold text-3xl">Suas Inscrições</h1>
        <p className="text-muted-foreground">Acompanhe suas inscrições abaixo:</p>
      </header>

      <section>
        {/* Lista de inscrições */}
        {enrollments.map((enrollment) => (
          <p key={enrollment.id}>
            id: {enrollment.id} atividade: {enrollment.student}
          </p>
        ))}
      </section>
    </div>
  )
}
