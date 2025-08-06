import HeroCards from "@/components/custom/home/HeroCards"
import { cardsHomepageStudent, cardsHomepageTeacher } from "@/constants/content/home/cardsHomepage"
import { UserRole } from "@/types/auth/UserRole"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * Página inicial do usuário logado.
 * Contém os links para as demais páginas do sistema.
 */
export default async function Home() {
  // Obter tipo de usuário
  const session = await getServerSession(authOptions)
  const userRole: UserRole = session?.user?.role

  return (
    <main>
      <HeroCards cards={userRole === "student" ? cardsHomepageStudent : cardsHomepageTeacher} />
    </main>
  )
}
