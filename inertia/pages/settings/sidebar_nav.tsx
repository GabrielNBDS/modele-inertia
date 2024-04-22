import useUser from '@/hooks/use_user'
import { Button, Select, Stack } from '@chakra-ui/react'
import { Link, router } from '@inertiajs/react'
import { LuLaptop2, LuLock, LuShield, LuUser } from 'react-icons/lu'

const items = [
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
  {
    icon: <LuLaptop2 className="text-lg" />,
    title: 'Sessões',
    href: '/configuracoes/sessoes',
  },
]

export function SidebarNav() {
  const { pathname } = window.location
  const { isAdmin } = useUser()!

  return (
    <>
      <Select
        display={{ base: 'block', md: 'none' }}
        onChange={(e) => router.visit(e.target.value)}
      >
        {items.map((item) => (
          <option value={item.href} selected={pathname.startsWith(item.href)}>
            {item.title}
          </option>
        ))}
        {isAdmin && <option value="/admin/dashboard">Admin</option>}
      </Select>
      <Stack as="nav" minW="160px" maxW="160px" display={{ base: 'none', md: 'flex' }}>
        {items.map((item) => (
          <Button
            w="full"
            justifyContent="flex-start"
            key={item.href}
            href={item.href}
            as={Link}
            variant={pathname.startsWith(item.href) ? 'solid' : 'ghost'}
            leftIcon={item.icon}
          >
            {item.title}
          </Button>
        ))}

        {isAdmin && (
          <Button
            w="full"
            justifyContent="flex-start"
            href="/admin/dashboard"
            as={Link}
            variant="ghost"
            leftIcon={<LuShield />}
          >
            Admin
          </Button>
        )}
      </Stack>
    </>
  )
}
