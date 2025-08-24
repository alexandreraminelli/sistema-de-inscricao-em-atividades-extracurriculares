"use server"

import { db } from "@/database/drizzle"
import { session } from "@/database/schema"
import { and, eq } from "drizzle-orm"

/** Retorno das funções de operações com horários de atividades. */
type SessionResult = { success: true; data: typeof session.$inferSelect } | { success: false; message: string }

/** Função para adicionar um horário de atividade no banco de dados. */
export async function createSession(params: typeof session.$inferInsert): Promise<SessionResult> {
  try {
    // Verificar se já existe uma atividade no mesmo dia e horário
    const existingSession = await db
      .select()
      .from(session)
      .where(
        and(
          eq(session.activity, params.activity), // FK da atividade
          eq(session.dayWeek, params.dayWeek), // Dia da semana
          eq(session.startTime, params.startTime) // Hora de início
        )
      )
      .limit(1)
    // Se já existir, retornar erro
    if (existingSession.length > 0)
      return {
        success: false,
        message: "Já existe um horário cadastrado para essa atividade nesse dia e horário.\nVerifique os horários cadastrados ou escolha outro dia/horário.",
      }

    // Adicionar e recuperar o horário
    const [newSession] = await db.insert(session).values(params).returning()
    // Retornar horário criado
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newSession)),
    }
  } catch (error) {
    console.error("Error creating session:", error)
    return { success: false, message: "Ocorreu um erro ao criar o horário. Tente novamente mais tarde ou entre em contato com o suporte." }
  }
}
