import { Separator } from '@/components/separator'
import Header from '@/components/header'
import { SidebarNav } from './sidebar_nav'
import { LuLock, LuUser } from 'react-icons/lu'

const sidebarNavItems = [
  {
    icon: <LuUser className="text-lg" />,
    title: 'Perfil',
    href: '/configuracoes/perfil',
  },
  {
    icon: <LuLock className="text-lg" />,
    title: 'Segurança',
    href: '/configuracoes/seguranca',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <Header />
      <div className="container mx-auto xl:max-w-5xl border shadow-md rounded-[0.5rem]">
        <div className="md:hidden">
          <img
            src="/examples/forms-light.png"
            width={1280}
            height={791}
            alt="Forms"
            className="block dark:hidden"
          />
          <img
            src="/examples/forms-dark.png"
            width={1280}
            height={791}
            alt="Forms"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden space-y-6 p-10 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
