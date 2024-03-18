import { Toaster } from '@/components/toaster'

interface AuthLayoutProps {
  children: JSX.Element
  subtitle: JSX.Element
}

export default function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  return (
    <>
      <Toaster />
      <div id="page-container" className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col">
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="relative mx-auto flex min-h-dvh w-full max-w-8xl justify-center overflow-hidden p-4 lg:p-8">
            <section className="w-full max-w-lg py-6">
              <header className="mb-10 text-center">
                <h1 className="mb-2 inline-flex items-center space-x-2 text-2xl font-bold">
                  Modèle
                </h1>
                {subtitle}
              </header>

              <div className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
                <div className="grow p-5 md:px-16 md:py-12">{children}</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
