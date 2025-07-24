// Declaração de tipos do NextAuth
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
  }
}
