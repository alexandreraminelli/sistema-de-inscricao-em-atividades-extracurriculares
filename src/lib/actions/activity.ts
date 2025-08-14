"use server"

import { db } from "@/database/drizzle"
import { activity } from "@/database/schema"
import { eq } from "drizzle-orm"

/** Retorno das funções de operações com atividades. Se success for `true` acompanha o atributo `data`, senão, acompanha o atributo `message`. */
type ActivityResult =
  | {
      success: true
      data: typeof activity.$inferSelect
    }
  | {
      success: false
      message: string
    }
/** Função para adicionar uma atividade extracurricular no banco de dados. */
export async function createActivity(params: typeof activity.$inferInsert): Promise<ActivityResult> {
  try {
    // Verificar se nome já existe
    const existingActivity = await db.select().from(activity).where(eq(activity.name, params.name)).limit(1)
    if (existingActivity.length > 0) return { success: false, message: "O nome da atividade já está sendo utilizado.\nEscolha outro nome ou verifique a página de atividades." }

    /** Adiciona e recupera a atividade no banco de dados. */
    const [newActivity] = await db.insert(activity).values(params).returning()
    // Retornar atividade criada
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newActivity)),
    }
  } catch (error) {
    return { success: false, message: `${error || "Um erro ocorreu ao criar a atividade."}` }
  }
}
