import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { Button, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import FormControl from '@/components/form_control'
import { OAuthButtonGroup } from '../login/page'

function SignUp() {
  const { data, setData, post, processing } = useForm({
    name: '',
    email: '',
    password: '',
  })

  return (
    <Stack
      spacing="6"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        post('/register')
      }}
    >
      <Stack spacing="5">
        <FormControl
          label="Nome"
          id="name"
          type="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />

        <FormControl
          label="E-mail"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />

        <FormControl
          label="Senha"
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
      </Stack>

      <Stack spacing="6">
        <Button isLoading={processing} type="submit">
          Cadastrar
        </Button>
        <HStack>
          <Divider />
          <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
            Ou cadastre-se com
          </Text>
          <Divider />
        </HStack>
        <OAuthButtonGroup />
      </Stack>
    </Stack>
  )
}

SignUp.layout = (page: JSX.Element) => (
  <AuthLayout
    title={<Heading size={{ base: 'xs', md: 'sm' }}>Crie sua conta</Heading>}
    subtitle={
      <>
        <Text>
          Já tem cadastro?{' '}
          <Button as={Link} fontSize={'md'} variant={'link'} href={'/entrar'}>
            Fazer login
          </Button>
        </Text>
      </>
    }
    children={page}
  />
)

export default SignUp
