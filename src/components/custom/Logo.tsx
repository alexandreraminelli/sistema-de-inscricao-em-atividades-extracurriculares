import Image from "next/image"

/** Imagem da logo do site. */
export default function Logo(
  props: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> // aceitar props de Image não definidos
) {
  return <Image src="/logo/logo-inline.svg" alt="Logo do site" width={312} height={48} {...props} />
}
