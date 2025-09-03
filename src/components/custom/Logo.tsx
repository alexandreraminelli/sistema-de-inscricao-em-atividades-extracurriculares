import Image from "next/image"

/** Imagem da logo do site. */
export default function Logo(
  { className, ...props }: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> // aceitar props de Image não definidos
) {
  return (
    <>
      {/* Logo light*/}
      <Image src="/logo/logo-inline.svg" alt="Logo do site" width={300} height={82} className={`transition-all dark:hidden ${className}`} {...props} />
      {/* Logo darl */}
      <Image src="/logo/logo-inline-white.svg" alt="Logo do site" width={300} height={82} className={`transition-all hidden dark:block ${className}`} {...props} />
    </>
  )
}
