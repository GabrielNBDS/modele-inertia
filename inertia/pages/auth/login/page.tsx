import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import useError from '@/hooks/use_error'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import FormInput from '@/components/form_input'
import SEO from '@/components/seo'

function Login() {
  const error = useError('auth')
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
  })

  return (
    <Stack
      spacing="6"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        post('/login', {
          onSuccess: () => {},
        })
      }}
    >
      <Stack spacing="5">
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
          rightElement={
            <Button as={Link} href="/esqueci-minha-senha" variant="text" size="xs">
              Esqueceu sua senha?
            </Button>
          }
          onChange={(e) => setData('password', e.target.value)}
        />
      </Stack>

      {(error?.length ?? 0) > 0 && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Stack spacing="6">
        <Button isLoading={processing} type="submit">
          Entrar
        </Button>
      </Stack>
    </Stack>
  )
}

Login.layout = (page: JSX.Element) => (
  <AuthLayout
    title={<Heading size={{ base: 'xs', md: 'sm' }}>Entre na sua conta</Heading>}
    subtitle={
      <>
        <Text>
          Não tem conta?{' '}
          <Button as={Link} fontSize={'md'} variant={'link'} href={'/cadastrar'}>
            Cadastre-se
          </Button>
        </Text>
      </>
    }
    children={
      <>
        <SEO title="Fazer login" />
        {page}
      </>
    }
  />
)

export default Login
