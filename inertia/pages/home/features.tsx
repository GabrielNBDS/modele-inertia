import { Button } from '@/components/button'
import { LuAlertCircle } from 'react-icons/lu'

export default function Features() {
  return (
    <section id="features" className="container mx-auto xl:max-w-5xl">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Kickstart your marketing</h2>

          <p className="mt-4 mb-6 text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
            nesciunt eos fugiat.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:gap-x-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="group transition-all block rounded-xl border p-4 shadow-sm hover:border-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-neutral-500/10 group-hover:bg-primary transition-all text-2xl group-hover:text-white p-3">
                <LuAlertCircle />
              </span>

              <h2 className="mt-2 font-bold">Accountant</h2>

              <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
