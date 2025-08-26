"use server"

import { db } from "@/database/drizzle"
import { schedule } from "@/database/schema"
import { and, eq } from "drizzle-orm"

/** Retorno das funções de operações com horários de atividades. */
type ScheduleResult = { success: true; data: typeof schedule.$inferSelect } | { success: false; message: string }

/** Função para adicionar um horário de atividade no banco de dados. */
export async function createSchedule(params: typeof schedule.$inferInsert): Promise<ScheduleResult> {
  try {
    // Verificar se já existe uma atividade no mesmo dia e horário
    const existingSchedule = await db
      .select()
      .from(schedule)
      .where(
        and(
          eq(schedule.activity, params.activity), // FK da atividade
          eq(schedule.dayWeek, params.dayWeek), // Dia da semana
          eq(schedule.time, params.time) // Horário
        )
      )
      .limit(1)
    // Se já existir, retornar erro
    if (existingSchedule.length > 0)
      return {
        success: false,
        message: "Já existe um horário cadastrado para essa atividade nesse dia e horário.\nVerifique os horários cadastrados ou escolha outro dia/horário.",
      }

    // Adicionar e recuperar o horário
    const [newSchedule] = await db.insert(schedule).values(params).returning()
    // Retornar horário criado
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newSchedule)),
    }
  } catch (error) {
    console.error("Error creating schedule:", error)
    return { success: false, message: "Ocorreu um erro ao criar o horário. Tente novamente mais tarde ou entre em contato com o suporte." }
  }
}

/** Função para atualizar um horário de atividade no banco de dados. */
export async function updateSchedule(id: string, params: Partial<typeof schedule.$inferInsert>): Promise<ScheduleResult> {
  try {
    // Verificar se horário existe
    const existingActivity = await db.select().from(schedule).where(eq(schedule.id, id)).limit(1)
    if (existingActivity.length === 0) return { success: false, message: "O horário não foi encontrado no banco de dados. \nEle pode ter sido excluído recentemente." }

    // Verificar se novo horário (dia da semana e hora) não vai conflitar com outro já existente

    // Executar atualização
    const [updatedSchedule] = await db.update(schedule).set(params).where(eq(schedule.id, id)).returning()
    // Retornar horário atualizado
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedSchedule)),
    }
  } catch (error) {
    console.error("Error updating schedule:", error)
    return { success: false, message: "Ocorreu um erro ao atualizar o horário. Tente novamente mais tarde ou entre em contato com o suporte." }
  }
}

/** Função para deletar um horário de atividade no banco de dados. */
export async function deleteSchedule(id: string): Promise<ScheduleResult> {
  try {
    // Verificar se horário existe
    const existingSchedule = await db.select().from(schedule).where(eq(schedule.id, id)).limit(1)
    if (existingSchedule.length === 0) return { success: false, message: "O horário não foi encontrado no banco de dados. \nEle pode já ter sido excluído recentemente." }

    // Executar exclusão
    const [deletedActivity] = await db.delete(schedule).where(eq(schedule.id, id)).returning()
    // Retornar horário excluído
    return {
      success: true,
      data: JSON.parse(JSON.stringify(deletedActivity)),
    }
  } catch (error) {
    console.error("Error deleting schedule:", error)
    return { success: false, message: "Ocorreu um erro ao excluir o horário. Tente novamente mais tarde ou entre em contato com o suporte." }
  }
}
