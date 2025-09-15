"use server"

import { db } from "@/database/drizzle"
import { activity as activityDb, enrollment, schedule as scheduleDb } from "@/database/schema"
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
      .innerJoin(scheduleDb, eq(enrollment.schedule, scheduleDb.id)) // Join com schedule
      .innerJoin(activityDb, eq(scheduleDb.activity, activityDb.id)) // Join com activity
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
/** Função para cancelar a inscrição de um aluno em uma atividade. */
export async function cancelEnrollment(studentId: string, enrollmentId: string): Promise<EnrollmentResult> {
  try {
    // Verificar se inscrição existe
    const existingActivity = await db.select().from(enrollment).where(eq(enrollment.id, enrollmentId)).limit(1)
    if (existingActivity.length === 0) return { success: false, message: "A inscrição não foi encontrada no banco de dados. \nEla pode ter sido cancelada recentemente." }

    // Deletar inscrição
    const [deletedEnrollment] = await db.delete(enrollment).where(eq(enrollment.id, enrollmentId)).returning()
    return {
      success: true,
      data: JSON.parse(JSON.stringify(deletedEnrollment)),
    }
  } catch (error) {
    console.error("Error cancelling enrollment:", error)
    return { success: false, message: "Ocorreu um erro ao cancelar a sua inscrição. Tente novamente mais tarde ou entre em contato o suporte." }
  }
}

/** Verificar se um aluno está inscrito em um horário. */
export async function isEnrolledInSchedule(studentId: string, scheduleId: string) {
  const existingEnrollment = await db
    .select()
    .from(enrollment)
    .where(and(eq(enrollment.student, studentId), eq(enrollment.schedule, scheduleId)))

  return existingEnrollment.length > 0
}

/** Obter inscrição do aluno em um horário. */
export async function getEnrollmentInSchedule(studentId: string, scheduleId: string) {
  const existingEnrollment = await db
    .select()
    .from(enrollment)
    .where(and(eq(enrollment.student, studentId), eq(enrollment.schedule, scheduleId)))
    .limit(1)
  return existingEnrollment
}

/** Obter quantidade de inscrições para um horário. */
export async function getEnrollmentCountBySchedule(scheduleId: string) {
  const [enrollments] = await db.select({ count: count() }).from(enrollment).where(eq(enrollment.schedule, scheduleId))
  return enrollments.count
}
