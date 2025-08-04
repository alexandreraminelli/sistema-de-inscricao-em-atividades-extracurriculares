"use server"

import { db } from "@/database/drizzle"
import { activity } from "@/database/schema"

/** Retorno de `createActivity`. Se success for `true` acompanha o atributo `data`, senão, acompanha o atributo `message`. */
type CreateActivityResult =
  | {
      success: true
      data: typeof activity.$inferSelect
    }
  | {
      success: false
      message: string
    }
/** Função para adicionar uma atividade extracurricular no banco de dados. */
export async function createActivity(params: typeof activity.$inferInsert): Promise<CreateActivityResult> {
  try {
    /** Adiciona e recupera a atividade no banco de dados. */
    const newActivity = await db.insert(activity).values(params).returning()
    // Retornar atividade criada
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newActivity[0])),
    }
  } catch (error) {
    return { success: false, message: `${error || "Um erro ocorreu ao criar a atividade."}` }
  }
}
