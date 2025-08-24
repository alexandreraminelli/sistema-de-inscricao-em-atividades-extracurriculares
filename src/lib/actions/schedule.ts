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
