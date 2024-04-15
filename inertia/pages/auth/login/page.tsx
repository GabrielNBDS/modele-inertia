import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import useError from '@/hooks/use_error'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import FormControl from '@/components/form_control'

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="secondary" spacing="4">
    <Button flexGrow={1}>
      <VisuallyHidden>Entrar com Google</VisuallyHidden>
      <FcGoogle />
    </Button>
  </ButtonGroup>
)

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
        <HStack>
          <Divider />
          <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
            Ou continue com
          </Text>
          <Divider />
        </HStack>
        <OAuthButtonGroup />

        <Button as={Link} href="/esqueci-minha-senha" variant="text" size="sm" mx="auto">
          Esqueceu sua senha?
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
    children={page}
  />
)

export default Login
