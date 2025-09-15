"use server"

import { db } from "@/database/drizzle"
import { activity as activityDb, enrollment, schedule } from "@/database/schema"
import { and, count, eq } from "drizzle-orm"

/** Retorno das funções de operações com inscrições. Se success for `true` acompanha o atributo `data`, senão, acompanha o atributo `message`. */
type EnrollmentResult =
  | {
      success: true
      data: typeof enrollment.$inferSelect
    }
  | {
      success: false
      message: string
    }
/** Função para inscrever um aluno em uma atividade. */
export async function createEnrollment(activityId: string, params: typeof enrollment.$inferInsert): Promise<EnrollmentResult> {
  try {
    // Verificar se aluno atingiu limite de inscrições em 4 atividades
    const [quantityEnrollments] = await db.select({ count: count() }).from(enrollment).where(eq(enrollment.student, params.student))
    if (quantityEnrollments.count >= 4) {
      return { success: false, message: "Você já atingiu o limite de 4 inscrições em atividades." }
    }
    // Verificar se aluno já está inscrito na atividade (join enrollment -> schedule -> activity)
    const existingEnrollment = await db
      .select()
      .from(enrollment)
      .innerJoin(schedule, eq(enrollment.schedule, schedule.id)) // Join com schedule
      .innerJoin(activityDb, eq(schedule.activity, activityDb.id)) // Join com activity
      .where(and(eq(enrollment.student, params.student), eq(activityDb.id, activityId)))
    if (existingEnrollment.length != 0) {
      return { success: false, message: "Você já está inscrito nessa atividade. Para mudar de horário, cancele sua inscrição e inscreva-se novamente." }
    }

    // Adicionar e recuperar a inscrição
    const [newEnrollment] = await db.insert(enrollment).values(params).returning()
    // Retornar inscrição criada
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newEnrollment)),
    }
  } catch (error) {
    console.error("Error creating enrollment:", error)
    return { success: false, message: "Ocorreu um erro ao realizar a sua inscrição. Tente novamente mais tarde ou entre em contato com o suporte." }
  }
}
