import { Flex, Button, useColorModeValue, Container, Avatar } from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import { LuLogIn } from 'react-icons/lu'
import { Logo } from '../logo'
import useUser from '@/hooks/use_user'

export default function Header() {
  const user = useUser()

  return (
    <Flex
      borderBottom={1}
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Container maxW="3xl">
        <Flex align={'center'} h="100%" justify="space-between">
          <Link href="/">
            <Logo height={8} />
          </Link>

          {user ? (
            <Link href="/configuracoes/perfil">
              <Avatar
                size="sm"
                name={user.name}
                // src={user.avatar}
              />
            </Link>
          ) : (
            <Button as={Link} variant={'link'} href={'/entrar'} rightIcon={<LuLogIn />}>
              Entrar
            </Button>
          )}
        </Flex>
      </Container>
    </Flex>
  )
}
