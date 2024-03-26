import useUser from '@/hooks/use_user'
import { Link } from '@inertiajs/react'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Separator } from '../separator'
import { LuLogOut } from 'react-icons/lu'

function HeaderPopUp() {
  const user = useUser()!

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
          // src="https://github.com/shadcn.png"
          />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="text-sm flex flex-col gap-2">
        {user?.isAdmin && (
          <>
            <ul className="flex flex-col gap-2">
              <li className="text-muted-foreground">Admin</li>
              <li>Admin Panel</li>
            </ul>
            <Separator />
          </>
        )}

        <ul className="flex flex-col gap-2">
          <li className="text-muted-foreground">{user?.email}</li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/configuracoes/perfil">Perfil</Link>
          </li>
          <li>
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center gap-1 text-destructive"
            >
              <LuLogOut /> Logout
            </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default function Header() {
  const user = useUser()

  return (
    <>
      <div className="relative overflow-hidden">
        <header id="page-header" className="relative flex flex-none items-center py-8">
          <div className="container mx-auto xl:max-w-5xl flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-wide">
              Modèle
            </Link>

            {!user ? (
              <nav className="md:gap-6 md:flex items-center justify-center hidden">
                <a href="#features" className="text-sm font-semibold hover:text-primary">
                  <span>Recursos</span>
                </a>
                <a href="#pricing" className="text-sm font-semibold hover:text-primary">
                  <span>Preços</span>
                </a>
                <a href="#contact" className="text-sm font-semibold hover:text-primary">
                  <span>Contato</span>
                </a>
              </nav>
            ) : (
              <HeaderPopUp />
            )}
          </div>
        </header>
      </div>
    </>
  )
}
