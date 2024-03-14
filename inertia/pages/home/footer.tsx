import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto flex py-4 px-12 items-center w-full justify-between xl:max-w-5xl">
        <Link href="/" className="text-lg font-bold tracking-wide">
          Modèle
        </Link>

        <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
