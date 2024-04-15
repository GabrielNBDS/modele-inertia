import { Logo } from '@/components/logo'
import useUser from '@/hooks/use_user'
import {
  Avatar,
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { LuGauge, LuMenu } from 'react-icons/lu'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useUser()!
  const sidebar = useDisclosure()

  const NavItem = (props: any) => {
    const { icon, children: navItemChild, ...rest } = props
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color="whiteAlpha.700"
        _hover={{
          bg: 'blackAlpha.300',
          color: 'whiteAlpha.900',
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="6"
            _groupHover={{
              color: 'gray.300',
            }}
            as={icon}
          />
        )}
        {navItemChild}
      </Flex>
    )
  }

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
      bg="brand.500"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Logo color="brand.300" />
        <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
          Modèle
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={LuGauge}>Dashboard</NavItem>
      </Flex>
    </Box>
  )

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: 'gray.700',
      }}
      minH="100vh"
    >
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
          />

          <Avatar
            ml="auto"
            size="sm"
            name={user.name}
            // src={user.avatar}
          />
        </Flex>

        <Box as="main" p="4">
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
        </Box>
      </Box>
    </Box>
  )
}
