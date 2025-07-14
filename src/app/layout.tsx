import "@/style/globals.css" // Tailwind CSS
import type { Metadata } from "next"
import { Poppins } from "next/font/google" // fonte
import { ThemeProvider } from "@/components/layout/theme-provider"

/** Fonte padrão do site. */
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

/** Metadados raiz do site. */
export const metadata: Metadata = {
  title: {
    template: "%s | Sistema de Inscrição em Atividades Extracurriculares",
    default: "Sistema de Inscrição em Atividades Extracurriculares",
  },
  description: "Sistema acadêmico para gerenciamento e inscrição em atividades extracurriculares.",
}

/** Layout raiz do site. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // usar tema do sistema do usuário
          enableSystem // detecção automática do tema do SO
          disableTransitionOnChange // desabilitar animações (evitar flashes e tornar mudança mais suave)
        >
          {/* Componente filho */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
