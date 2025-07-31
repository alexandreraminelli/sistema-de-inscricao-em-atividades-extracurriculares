import { CardLinkType } from "@/types/content/CardType"

/** Endpoint público das imagens. */
const ILLUSTRATIONS_ENDPOINT = "images/illustrations/home"
/** Conteúdo dos cards da página inicial dos alunos.  */
export const cardsHomepageStudent: CardLinkType[] = [
  {
    title: "Explorar Atividades",
    description: "Descubra projetos e atividades disponíveis para você se inscrever e participar.",
    buttonText: "Ver Atividades",
    href: "/atividades",
    image: `${ILLUSTRATIONS_ENDPOINT}/atividades.svg`,
  },
  {
    title: "Minhas Inscrições",
    description: "Acompanhe todas as atividades em que você está inscrito, com horários, salas e opções de cancelamento",
    buttonText: "Ver Inscrições",
    href: "/inscricoes",
    image: `${ILLUSTRATIONS_ENDPOINT}/inscricoes.svg`,
  },
  {
    title: "Calendário",
    description: "Consulte datas e prazos importantes",
    buttonText: "Abrir Calendário",
    href: "/calendario",
    image: `${ILLUSTRATIONS_ENDPOINT}/calendario.svg`,
  },
  {
    title: "Meus Certificados",
    description: "Visualize e baixe os certificados das atividades que você concluiu",
    buttonText: "Acessar Certificados",
    href: "/certificados",
    image: `${ILLUSTRATIONS_ENDPOINT}/certificado.svg`,
  },
  {
    title: "Informações Gerais e Documentos Importantes",
    description: "Consulte regulamentos, guias e outros documentos úteis sobre as atividades extracurriculares",
    buttonText: "Ver Informações e Documentos",
    href: "/informacoes",
    image: `${ILLUSTRATIONS_ENDPOINT}/duvidas.svg`,
  },
]

/** Conteúdo dos cards da página inicial dos professores. */
export const cardsHomepageTeacher: CardLinkType[] = []
