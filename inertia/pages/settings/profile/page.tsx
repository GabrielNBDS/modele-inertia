import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  IconButton,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import SettingsLayout from '../layout'
import { ReactNode } from 'react'
import FormInput from '@/components/form_input'
import useUser from '@/hooks/use_user'
import useFlash from '@/hooks/use_flash'
import { useForm } from '@inertiajs/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import SEO from '@/components/seo'

const ProfilePage = () => {
  const { emailChanged } = useFlash<{ emailChanged?: boolean }>()
  const user = useUser()!

  const { data, setData, post, processing } = useForm({
    name: user.name,
    email: user.email,
  })

  const {
    setData: setCodeData,
    post: postCode,
    processing: processingCode,
  } = useForm({
    code: '',
  })

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack w="full" spacing={6}>
      <HStack justify="space-between">
        <Text color="fg.muted">Gerencie os dados do seu perfil</Text>

        <IconButton
          aria-label="Alternar tema"
          variant="ghost"
          icon={colorMode === 'dark' ? <LuSun /> : <LuMoon />}
          onClick={toggleColorMode}
        />
      </HStack>
      <Stack
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/perfil')
        }}
        spacing={6}
      >
        <FormInput
          label="Nome"
          id="name"
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

        <Button type="submit" isLoading={processing}>
          Atualizar Perfil
        </Button>
      </Stack>

      {emailChanged && (
        <>
          <Alert status="info" variant="subtle" flexDirection="column">
            <HStack justify="start" w="full" mb={2}>
              <AlertIcon />
              <AlertTitle>Atenção</AlertTitle>
            </HStack>
            <AlertDescription>
              Para confirmar a atualização do seu endereço de e-mail, foi enviado um código para o
              e-mail desejado. Digite o código abaixo para confirmar a troca de endereço.
            </AlertDescription>
          </Alert>

          <Stack
            as="form"
            onSubmit={(e) => {
              e.preventDefault()
              postCode('/configuracoes/atualizar-email')
            }}
          >
            <HStack mx="auto">
              <PinInput onChange={(e) => setCodeData('code', e)} size="lg">
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>

            <Button type="submit" isLoading={processingCode}>
              Confirmar Código
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}

ProfilePage.layout = (page: ReactNode) => (
  <SettingsLayout
    children={
      <>
        <SEO title="Seu perfil" />
        {page}
      </>
    }
  />
)

export default ProfilePage
