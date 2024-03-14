import { Button } from '@/components/button'
import { Link } from '@inertiajs/react'
import { LuLogIn } from 'react-icons/lu'

export default function Hero() {
  return (
    <div className="container overflow-hidden relative mx-auto flex flex-col space-y-16 px-4 py-16 pt-0 md:pt-16 text-center lg:flex-row lg:space-y-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-5xl">
      <div className="lg:flex lg:w-1/2 lg:items-center">
        <div>
          <h1 className="mb-4 text-4xl font-black">
            Next generation <span className="text-primary">website builder</span>
          </h1>
          <h2 className="text-lg font-medium leading-relaxed">
            Super fast and easy to use software to power your next idea or build your client’s web
            projects. Get it today and profit.
          </h2>
          <div className="flex flex-col justify-center space-y-2 pb-16 pt-10 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 lg:justify-start">
            <Button asChild>
              <Link href="/entrar">
                <LuLogIn className="mr-2 h-4 w-4" /> Começar Agora
              </Link>
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
      <div className="lg:ml-16 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div className="relative mx-5 lg:w-96">
          <div className="absolute left-0 top-0 -ml-20 -mt-16 size-40 rounded-full border border-primary/40 lg:size-72" />
          <div className="absolute left-0 top-0 -ml-14 -mt-20 size-40 rounded-full border border-primary/30 lg:size-72" />
          <div className="absolute bottom-0 right-0 -mb-16 -mr-20 size-40 rounded-full border border-primary/40 lg:size-72" />
          <div className="absolute bottom-0 right-0 -mb-20 -mr-14 size-40 rounded-full border border-primary/30 lg:size-72" />
          <div className="absolute inset-0 -m-6 -rotate-2 rounded-xl border-primary" />
          <div className="absolute inset-0 -m-6 rotate-1 rounded-xl bg-primary/70 bg-opacity-75 shadow-inner dark:bg-opacity-75" />
          <img
            src="https://cdn.tailkit.com/media/placeholders/photo-RSCirJ70NDM-800x1000.jpg"
            className="relative mx-auto rounded-lg shadow-lg"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
  )
}
