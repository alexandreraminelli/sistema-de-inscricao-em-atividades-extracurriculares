"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"

/**
 * Provedor de tema para o aplicativo.
 * Permite alternar entre temas claro e escuro.
 */
export function ThemeProvider(
  { children, ...props }: React.ComponentProps<typeof NextThemeProvider> // props
) {
  // Desestrutura as propriedades do provedor de tema e passa para o componente NextThemeProvider.
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
