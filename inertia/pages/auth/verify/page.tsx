import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { Button, HStack, Heading, PinInput, PinInputField, Stack, Text } from '@chakra-ui/react'
import SEO from '@/components/seo'
import { LuLogOut } from 'react-icons/lu'

function Verify() {
  const { setData, post, processing } = useForm({
    code: '',
  })

  return (
    <Stack spacing={6}>
      <Stack
        spacing={6}
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/verificar-email')
        }}
      >
        <HStack mx="auto">
          <PinInput onChange={(e) => setData('code', e)} size="lg">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <Button type="submit" w="full" isLoading={processing} className="w-full">
          Verificar E-mail
        </Button>
      </Stack>

      <Button
        as={Link}
        href="/configuracoes/verificar-email/reenviar"
        type="submit"
        w="full"
        variant="outline"
        method="post"
      >
        Reenviar e-mail
      </Button>

      <Button
        as={Link}
        href="/logout"
        method="post"
        colorScheme="red"
        variant="link"
        w="full"
        leftIcon={<LuLogOut />}
      >
        Sair da sessão atual
      </Button>
    </Stack>
  )
}

Verify.layout = (page: JSX.Element) => (
  <AuthLayout
    title={<Heading size={{ base: 'xs', md: 'sm' }}>Verifique seu e-mail</Heading>}
    subtitle={
      <Text>
        Obrigado por se inscrever! Um código de verificação foi enviado para seu email, digite-o
        abaixo.
      </Text>
    }
    children={
      <>
        <SEO title="Verifique seu e-mail" />
        {page}
      </>
    }
  />
)

export default Verify
