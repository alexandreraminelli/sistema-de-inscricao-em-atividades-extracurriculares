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

/** Função para atualizar uma atividade extracurricular no banco de dados. */
export async function updateActivity(id: string, params: Partial<typeof activity.$inferInsert>): Promise<ActivityResult> {
  try {
    // Verificar se atividade existe
    const existingActivity = await db.select().from(activity).where(eq(activity.id, id)).limit(1)
    if (existingActivity.length === 0) return { success: false, message: "A atividade não foi encontrada no banco de dados. \nEla pode ter sido excluída recentemente." }

    // Se nome for atualizado, verificar se já existe outra atividade com o mesmo nome
    if (params.name) {
      const activityWithSameName = await db.select().from(activity).where(eq(activity.name, params.name)).limit(1)
      if (activityWithSameName.length > 0 && activityWithSameName[0].id !== id) return { success: false, message: `Esse nome já está sendo utilizado. \nEscolha outro nome ou edite a atividade ${params.name}.` }
    }

    // Executar atualização
    const [updatedActivity] = await db.update(activity).set(params).where(eq(activity.id, id)).returning()
    // Retornar atividade atualizada
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedActivity)),
    }
  } catch (error) {
    return { success: false, message: `${error || "Um erro ocorreu ao atualizar a atividade."}` }
  }
}

/** Função para deletar uma atividade no banco de dados. */
export async function deleteActivity(id: string): Promise<ActivityResult> {
  try {
    // Verificar se atividade existe
    const existingActivity = await db.select().from(activity).where(eq(activity.id, id)).limit(1)
    if (existingActivity.length === 0) return { success: false, message: "A atividade não foi encontrada no banco de dados. \nEla pode ter sido excluída recentemente." }

    // Executar deleção
    const [deletedActivity] = await db.delete(activity).where(eq(activity.id, id)).returning()
    // Retornar atividade deletada
    return {
      success: true,
      data: JSON.parse(JSON.stringify(deletedActivity)),
    }
  } catch (error) {
    return { success: false, message: "Ocorreu um erro ao excluir a atividade." }
  }
}
