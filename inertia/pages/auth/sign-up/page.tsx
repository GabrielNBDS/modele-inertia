import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import FormInput from '@/components/form_input'
import SEO from '@/components/seo'

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
        <FormInput
          label="Nome"
          id="name"
          type="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />

        <FormInput
          label="E-mail"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
        />

        <FormInput
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
    children={
      <>
        <SEO title="Crie sua conta" />
        {page}
      </>
    }
  />
)

export default SignUp
