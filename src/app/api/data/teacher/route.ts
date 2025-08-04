import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"

/** Obtêm os professores no banco de dados. */
export async function GET() {
  return Response.json(await db.select().from(users).where(eq(users.role, "teacher")).orderBy(users.name))
}
