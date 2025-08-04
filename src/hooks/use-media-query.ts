"use client"

import { useEffect, useState } from "react"

/**
 * Hook para detectar media queries no cliente.
 * @param query - A media query a ser testada (ex: "(min-width: 768px)")
 * @returns boolean - Se a media query corresponde
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Define o estado inicial
    setMatches(media.matches)

    // Listener para mudanças
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Adiciona o listener
    media.addEventListener("change", listener)

    // Cleanup
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
