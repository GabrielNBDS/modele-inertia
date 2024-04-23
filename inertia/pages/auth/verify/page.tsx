import AuthLayout from '../layout'
import { router, useForm } from '@inertiajs/react'
import { Button, HStack, Heading, PinInput, PinInputField, Stack, Text } from '@chakra-ui/react'
import SEO from '@/components/seo'

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

      <form
        onSubmit={(e) => {
          e.preventDefault()
          try {
            router.post('/configuracoes/verificar-email/reenviar')
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <Button type="submit" w="full" variant="outline">
          Reenviar e-mail
        </Button>
      </form>
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
