import { Logo } from '@/components/logo'
import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import { LuLogIn } from 'react-icons/lu'

export default function SplitScreen() {
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={6} w="full" maxW="lg">
          <HStack>
            <Logo h={6} />
            <Heading size="xs">Modèle</Heading>
          </HStack>

          <Heading size={{ base: 'md', lg: 'lg' }}>
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'brand.400',
                zIndex: -1,
              }}
            >
              The Boilerplate
            </Text>
            <br />{' '}
            <Text color="brand.400" as="span">
              to rule them all
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
            Never struggle choosing a stack again. This is the definitive one.
          </Text>

          <Button rightIcon={<LuLogIn />} as={Link} maxW="max-content" href="entrar" rounded="full">
            Login
          </Button>
        </Stack>
      </Flex>
      <Flex display={['none', 'none', 'flex']} maxH="100vh" flex={1}>
        <Image
          alt=""
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531053326607-9d349096d887?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Flex>
    </Stack>
  )
}
