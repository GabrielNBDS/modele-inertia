import { Logo } from '@/components/logo'
import Toaster from '@/components/toaster'
import useFlash from '@/hooks/use_flash'
import { Box, Container, Stack, Text } from '@chakra-ui/react'

interface AuthLayoutProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  Toaster()

  const { emailSent, codeValidated } = useFlash<{ emailSent: boolean; codeValidated: boolean }>()
  {
    !emailSent &&
      !codeValidated &&
      'Digite seu e-mail para receber um link de recuperação de senha.'
  }
  {
    emailSent && 'Um e-mail com um código de confirmação foi enviado. Digite-o abaixo'
  }
  {
    codeValidated && 'Último passo, escolha uma nova senha'
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            {title}
            {subtitle}

            {window?.location?.pathname === '/esqueci-minha-senha' && (
              <>
                {!emailSent && !codeValidated && (
                  <Text>Digite seu e-mail para recuperar sua conta</Text>
                )}
                {emailSent && <Text>Digite o código enviado para seu e-mail</Text>}
                {codeValidated && <Text>Último passo, escolha uma nova senha</Text>}
              </>
            )}
          </Stack>
        </Stack>

        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  )
}
