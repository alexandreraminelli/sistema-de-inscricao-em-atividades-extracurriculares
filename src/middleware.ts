import { NextResponse } from "next/server"

/**  Middleware personalizado para evitar problemas com Edge Runtime. */
export async function middleware() {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Aplicar middleware a todas as rotas, exceto as de API e arquivos estáticos
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
