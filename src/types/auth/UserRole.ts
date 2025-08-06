import { users } from "@/database/schema"

/** Papel do usuário. */
export type UserRole = typeof users.$inferSelect.role

/** Mapeamento do papel do usuário pro português. */
export const roleLabels: Record<UserRole, string> = {
  student: "Estudante",
  teacher: "Professor",
}
