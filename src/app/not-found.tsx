import NotFoundComponent from "@/components/custom/NotFound"
import AppLayout from "@/app/(root)/layout"

/** Página de erro 404 (não encontrado). */
export default function NotFound() {
  return (
    <AppLayout>
      <NotFoundComponent title="404: Página Não Encontrada" message={["A página que você está tentando acessar não existe ou não é possível acessá-la no momento.", "Verifique se o endereço inserido está correto ou tente novamente mais tarde."]} />
    </AppLayout>
  )
}
