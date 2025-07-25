import Image from "next/image"

/** Imagem da logo do site. */
export default function Favicon(
  { className, ...props }: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> // aceitar props de Image não definidos
) {
  return <Image src="/logo/favicon.svg" alt="Logo do site" width={40} height={40} className={`transition-all ${className}`} {...props} />
}
