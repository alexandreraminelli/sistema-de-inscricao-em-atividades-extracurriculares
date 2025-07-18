import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

/** Layout das páginas de autenticação. */
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Redirecionar usuários autenticados para a página inicial
  const session = await getServerSession()
  if (session) redirect("/")

  return <>{children}</>
}
