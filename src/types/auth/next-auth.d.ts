// Declaração de tipos do NextAuth
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      isAdmin?: boolean
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    isAdmin?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name: string
    role: string
    isAdmin: boolean
  }
}
