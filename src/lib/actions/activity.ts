"use server"

import { db } from "@/database/drizzle"
import { activity } from "@/database/schema"
import { toast } from "sonner"

/** Função para adicionar uma atividade extracurricular no banco de dados. */
export async function createActivity(params: typeof activity.$inferInsert) {
  try {
    /** Adiciona e recupera a atividade no banco de dados. */
    const newActivity = await db.insert(activity).values(params).returning()
    // Retornar atividade criada
    toast.success("Atividade criada com sucesso!", { description: `Atividade '${newActivity[0].name}' criada.` })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newActivity[0])),
    }
  } catch (error) {
    toast.error("Erro ao criar atividade!", { description: `${error}` })
    return { success: false, message: "Um erro ocorreu ao criar a atividade." }
  }
}
