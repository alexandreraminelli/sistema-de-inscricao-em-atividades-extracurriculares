import { Skeleton } from "@/components/ui/skeleton"

// Componente SVG Skeleton adaptado para usar o Skeleton do shadcn/ui
const SVGSkeleton = ({ className }: { className?: string }) => <Skeleton className={`${className} rounded`} />

/** Skeleton da página de informações da atividade. */
export default function ActivityInfoSkeleton() {
  return (
    <>
      <div>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 py-3.5 md:ps-2.5">
            <li className="inline-flex items-center gap-1.5">
              <a className="transition-colors">
                <Skeleton className="w-[48px] h-4 max-w-full" />
              </a>
            </li>
            <li className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <a className="transition-colors">
                <Skeleton className="w-[224px] h-4 max-w-full" />
              </a>
            </li>
            <li className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Skeleton className="w-[152px] h-4 max-w-full" />
            </li>
            <li className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span>
                <Skeleton className="w-[384px] h-4 max-w-full" />
              </span>
            </li>
          </ol>
        </nav>
        <main className="my-4 md:ms-4 flex items-center md:items-start justify-between flex-col-reverse md:flex-row gap-10">
          <article className="max-w-5xl space-y-6">
            <header>
              <h1 className="mb-4 md:mb-6">
                <Skeleton className="w-[384px] h-8 max-w-full" />
              </h1>
            </header>
            <section className="space-y-4">
              <p>
                <Skeleton className="w-[584px] h-4 max-w-full" />
              </p>
              <p></p>
              <p>
                <Skeleton className="w-[280px] h-4 max-w-full" />
              </p>
              <p></p>
              <p>
                <Skeleton className="w-full h-4 max-w-full" />
              </p>
              <p></p>
              <p>
                <Skeleton className="w-full h-4 max-w-full" />
              </p>
              <p>
                <Skeleton className="w-[280px] h-4 max-w-full" />
              </p>
              <p>
                <Skeleton className="w-full h-4 max-w-full" />
              </p>
            </section>
            <div className="flex flex-col gap-6 border shadow-sm p-6 rounded-lg">
              <section className="space-y-3">
                <h3>
                  <Skeleton className="w-[240px] h-6 max-w-full" />
                </h3>
                <p>
                  <Skeleton className="w-full h-4 max-w-full" />
                </p>
              </section>
            </div>
          </article>
          <aside className="max-md:w-full top-16">
            <div className="flex border shadow-sm p-6 max-md:mx-auto h-fit items-center flex-col gap-3 md:max-w-3xs rounded-lg">
              <header className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 [.border-b]:pb-6 p-0 m-0 w-full">
                <div className="leading-none">
                  <Skeleton className="w-full h-6" />
                </div>
              </header>
              <div className="bg-border shrink-0 w-full h-px"></div>
              <main className="p-0 m-0 w-full space-y-2.5 md:space-y-4">
                <div>
                  <h3>
                    <Skeleton className="w-[72px] h-5 max-w-full mb-1" />
                  </h3>
                  <p>
                    <Skeleton className="w-[152px] h-4 max-w-full" />
                  </p>
                </div>
                <div>
                  <h3>
                    <Skeleton className="w-[72px] h-5 max-w-full mb-1" />
                  </h3>
                  <p>
                    <Skeleton className="w-[152px] h-4 max-w-full" />
                  </p>
                </div>
                <div>
                  <h3>
                    <Skeleton className="w-[168px] h-5 max-w-full mb-1" />
                  </h3>
                  <p>
                    <Skeleton className="w-[16px] h-4 max-w-full" />
                  </p>
                </div>
              </main>
              <div className="bg-border shrink-0 w-full h-px"></div>
              <footer className="flex [.border-t]:pt-6 p-0 m-0 w-full flex-col items-center">
                <div className="inline-flex items-center justify-center gap-2 [&_svg:not([className*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring aria-invalid:border-destructive shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 rounded-md border">
                  <SVGSkeleton className="w-[24px] h-[24px]" />
                  <Skeleton className="w-[96px] h-4 max-w-full" />
                </div>
              </footer>
            </div>
          </aside>
        </main>
      </div>
    </>
  )
}
