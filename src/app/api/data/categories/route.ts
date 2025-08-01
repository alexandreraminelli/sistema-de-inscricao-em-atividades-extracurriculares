import { db } from "@/database/drizzle"
import { category } from "@/database/schema"

/** Obtêm as categorias no banco de dados. */
export async function GET() {
  return Response.json(await db.select().from(category).orderBy(category.name))
}
