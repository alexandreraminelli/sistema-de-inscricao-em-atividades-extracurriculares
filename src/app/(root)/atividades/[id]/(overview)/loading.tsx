import { Skeleton } from "@/components/ui/skeleton"

// Componente SVG Skeleton adaptado para usar o Skeleton do shadcn/ui
const SVGSkeleton = ({ className }: { className?: string }) => <Skeleton className={`${className} rounded`} />

/** Skeleton da página de informações da atividade. */
export default function ActivityInfoSkeleton() {
  return (
    <>
      <div>
        <nav aria-label="breadcrumb" data-slot="breadcrumb">
          <ol data-slot="breadcrumb-list" className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5 py-3.5 md:ps-2.5">
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <a data-slot="breadcrumb-link" className="hover:text-foreground transition-colors">
                <Skeleton className="w-[48px] h-4 max-w-full" />
              </a>
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <a data-slot="breadcrumb-link" className="hover:text-foreground transition-colors">
                <Skeleton className="w-[224px] h-4 max-w-full" />
              </a>
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <Skeleton className="w-[152px] h-4 max-w-full" />
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <SVGSkeleton className="lucide-chevron-right w-[24px] h-[24px]" />
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page">
                <Skeleton className="w-[384px] h-4 max-w-full" />
              </span>
            </li>
          </ol>
        </nav>
        <main className="my-4 md:ms-4 flex items-center md:items-start justify-between flex-col-reverse md:flex-row gap-x-4 gap-y-8 xl:gap-x-8">
          <article className="max-w-5xl space-y-6">
            <header>
              <h1 className="mb-4 md:mb-6 font-semibold text-2xl sm:text-3xl md:text-4xl text-center md:text-start">
                <Skeleton className="w-[384px] h-8 max-w-full" />
              </h1>
            </header>
            <section className="space-y-4 text-justify text-foreground/90">
              <Skeleton className="w-[584px] h-4 max-w-full" />
              <Skeleton className="w-[280px] h-4 max-w-full" />
              <Skeleton className="w-full h-4 max-w-full" />
              <Skeleton className="w-full h-4 max-w-full" />
              <Skeleton className="w-[280px] h-4 max-w-full" />
              <Skeleton className="w-full h-4 max-w-full" />
            </section>
            <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6">
              <section className="space-y-3">
                <h3 className="font-semibold text-xl md:text-2xl">
                  <Skeleton className="w-[240px] h-6 max-w-full" />
                </h3>
                <Skeleton className="w-full h-4 max-w-full" />
              </section>
            </div>
          </article>
          <aside className="h-fit md:sticky top-16 space-y-5">
            <div data-slot="card" className="bg-card text-card-foreground flex rounded-xl border shadow-sm p-6 max-md:mx-auto w-full h-fit items-center flex-col gap-3 text-center">
              <header data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 p-0 m-0 w-full">
                <div data-slot="card-title" className="font-semibold text-lg leading-5">
                  <Skeleton className="w-full h-6" />
                </div>
              </header>
              <div data-orientation="horizontal" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"></div>
              <section data-slot="card-content" className="p-0 m-0 w-full flex flex-row md:flex-col flex-wrap gap-2.5 md:gap-4 *:flex-1">
                <div className="min-w-40">
                  <Skeleton className="w-[72px] h-4 max-w-full mb-1" />
                  <Skeleton className="w-[152px] h-3.5 max-w-full" />
                </div>
                <div className="min-w-40">
                  <Skeleton className="w-[72px] h-4 max-w-full mb-1" />
                  <Skeleton className="w-[152px] h-3.5 max-w-full" />
                </div>
                <div className="min-w-40">
                  <Skeleton className="w-[168px] h-4 max-w-full mb-1" />
                  <Skeleton className="w-[16px] h-3.5 max-w-full" />
                </div>
              </section>
              <div data-orientation="horizontal" role="none" data-slot="separator" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"></div>
              <footer data-slot="card-footer" className="flex [.border-t]:pt-6 p-0 m-0 w-full flex-row flex-wrap items-center gap-4 *:flex-1">
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 has-[>svg]:px-3 shadow-xs border">
                  <SVGSkeleton className="w-[24px] h-[24px]" />
                  <Skeleton className="w-[48px] h-4 max-w-full" />
                </div>
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 has-[>svg]:px-3 shadow-xs border">
                  <SVGSkeleton className="w-[24px] h-[24px]" />
                  <Skeleton className="w-[56px] h-4 max-w-full" />
                </div>
              </footer>
            </div>
            <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-6 md:px-4 items-center">
              <div data-state="closed" data-slot="collapsible" className="w-full">
                <div data-slot="collapsible-trigger" className="w-full">
                  <header data-slot="card-header" className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 p-0 m-0 w-full flex flex-row justify-between items-center">
                    <SVGSkeleton className="lucide-calendar-range w-[24px] h-[24px]" />
                    <div data-slot="card-title" className="leading-none font-semibold text-center">
                      <Skeleton className="w-[64px] h-5 max-w-full" />
                    </div>
                    <SVGSkeleton className="lucide-chevron-down w-[24px] h-[24px]" />
                  </header>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </>
  )
}
