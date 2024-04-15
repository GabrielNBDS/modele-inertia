import useFlash from '@/hooks/use_flash'
import AuthLayout from '../layout'
import { Link } from '@inertiajs/react'
import ForgotPasswordFirstStep from './first_step'
import ForgotPasswordSecondStep from './second_step'
import ForgotPasswordThirdStep from './third_step'
import { Button, Heading, Stack } from '@chakra-ui/react'

function ForgotPassword() {
  const { emailSent, codeValidated } = useFlash<{ emailSent: boolean; codeValidated: boolean }>()

  return (
    <Stack spacing="6">
      {!emailSent && !codeValidated && <ForgotPasswordFirstStep />}

      {emailSent && <ForgotPasswordSecondStep />}

      {codeValidated && <ForgotPasswordThirdStep />}

      <Button mx="auto" as={Link} href="/entrar" variant="text" size="sm">
        Voltar
      </Button>
    </Stack>
  )
}

ForgotPassword.layout = (page: JSX.Element) => {
  return (
    <AuthLayout
      title={<Heading size={{ base: 'xs', md: 'sm' }}>Recupere sua conta</Heading>}
      children={page}
    />
  )
}

export default ForgotPassword
