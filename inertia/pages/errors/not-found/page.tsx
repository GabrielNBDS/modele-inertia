import { Logo } from '@/components/logo'
import { Box, Container, HStack, Heading, Text } from '@chakra-ui/react'
import { Head, Link } from '@inertiajs/react'
import modele from '~/config/modele'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página não encontrada (404) | {modele.appName}</title>
      </Head>
      <Container px={4} py={32} maxW="3xl">
        <Box w="full" maxW="60ch" mx="auto">
          <HStack>
            <Logo h={8} />
            <Heading size="xs">{modele.appName}</Heading>
          </HStack>
          <Heading mt={5} mb={3} size="xs">
            Página não encontrada (404)
          </Heading>
          <Text mb={3} color="fg.muted">
            A página que você procura foi movida ou não existe mais. Volte para a página inicial{' '}
            <Text decoration="underline" as={Link} href="/">
              clicando aqui
            </Text>
            .
          </Text>
        </Box>
      </Container>
    </>
  )
}
