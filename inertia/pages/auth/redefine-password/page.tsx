import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import SEO from '@/components/seo'
import FormInput from '@/components/form_input'
import { LuLogOut } from 'react-icons/lu'

function Verify() {
  const { setData, post, processing } = useForm({
    password: '',
  })

  return (
    <Stack spacing={6}>
      <Stack
        spacing={6}
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/redefinir-senha')
        }}
      >
        <FormInput
          onChange={(e) => setData('password', e.target.value)}
          label="Nova senha"
          id="password"
          type="password"
        />

        <Button type="submit" w="full" isLoading={processing} className="w-full">
          Criar nova senha
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
    </Stack>
  )
}

Verify.layout = (page: JSX.Element) => (
  <AuthLayout
    title={<Heading size={{ base: 'xs', md: 'sm' }}>Crie uma nova senha</Heading>}
    subtitle={<Text>É necessário criar uma nova senha após o primeiro login.</Text>}
    children={
      <>
        <SEO title="Crie uma nova senha" />
        {page}
      </>
    }
  />
)

export default Verify
