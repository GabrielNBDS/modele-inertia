import AppLayout from '@/app/layout'
import { Logo } from '@/components/logo'
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import { ReactNode } from 'react'
import { LuGauge, LuMenu, LuUsers } from 'react-icons/lu'

const items = [
  {
    icon: <LuGauge className="text-lg" />,
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    icon: <LuUsers className="text-lg" />,
    title: 'Usuários',
    href: '/admin/usuarios',
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = window.location
  const sidebar = useDisclosure()

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Stack px="4" py="5">
        <Flex align="center" justify="center" mb="4">
          <Logo color="brand.300" />
          <Text fontSize="2xl" ml="2" fontWeight="semibold">
            Modèle
          </Text>
        </Flex>

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
      </Stack>
    </Box>
  )

  return (
    <AppLayout>
      <Box as="section" minH="100vh">
        <SidebarContent
          display={{
            base: 'none',
            md: 'unset',
          }}
        />
        <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton zIndex={10000} />
            <SidebarContent w="full" maxW="320px" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box
          ml={{
            base: 0,
            md: 60,
          }}
          transition=".3s ease"
        >
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg="white"
            _dark={{
              bg: 'gray.800',
            }}
            borderBottomWidth="1px"
            borderColor="blackAlpha.300"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
              onClick={sidebar.onOpen}
              icon={<LuMenu />}
              size="sm"
              variant="ghost"
            />

            <Button ml="auto" size="sm" variant="ghost" as={Link} href="/dashboard">
              Voltar
            </Button>
          </Flex>

          <Box as="main" p="4">
            {children}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  )
}
