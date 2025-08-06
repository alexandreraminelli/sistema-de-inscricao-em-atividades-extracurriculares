import { users } from "@/database/schema"

/** Papel do usuário. */
export type UserRole = typeof users.$inferSelect.role
