import { Button } from '@/components/button'
import { LuCheck } from 'react-icons/lu'

export default function Pricing() {
  return (
    <div id="pricing" className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        <div className="rounded-2xl border border-primary p-6 shadow-sm ring-1 sm:order-last sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium">
              Pro
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold sm:text-4xl"> 30$ </strong>

              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> 20 users included </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> 5GB of storage </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Help center access </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Phone support </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Community access </span>
            </li>
          </ul>

          <Button className="mt-4 w-full">Get Started</Button>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium">
              Starter
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold sm:text-4xl"> 20$ </strong>

              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> 10 users included </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> 2GB of storage </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <LuCheck className="text-primary" />

              <span> Help center access </span>
            </li>
          </ul>

          <Button variant="outline" className="mt-4 w-full">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
