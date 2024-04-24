import { Logo } from '@/components/logo'
import { Box, Container, HStack, Heading, Text } from '@chakra-ui/react'
import { Head, Link } from '@inertiajs/react'

export default function ServerError(props: { error: any }) {
  return (
    <>
      <Head>
        <title>Erro interno (5XX) | Modèle</title>
      </Head>
      <Container px={4} py={32} maxW="3xl">
        <Box w="full" maxW="60ch" mx="auto">
          <HStack>
            <Logo h={8} />
            <Heading size="xs">Modèle</Heading>
          </HStack>
          <Heading mt={5} mb={3} size="xs">
            Erro interno (5XX)
          </Heading>
          <Text mb={3} color="fg.muted">
            {props.error.message}
          </Text>
          <Text mb={3} color="fg.muted">
            Volte para a página inicial{' '}
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
