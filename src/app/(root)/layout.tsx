import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

/** Layout dos componentes principais da aplicação. */
export default async function Layout({ children }: { children: React.ReactNode }) {
  // Redirecionar usuários não autenticados para a página de login
  const session = await getServerSession()
  if (!session) redirect("/login")

  return <>{children}</>
}
