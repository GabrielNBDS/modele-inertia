import { Button, Stack, Text } from '@chakra-ui/react'
import SettingsLayout from '../layout'
import { ReactNode } from 'react'
import { useForm } from '@inertiajs/react'
import FormInput from '@/components/form_input'

const SecurityPage = () => {
  const { data, setData, post, processing, reset } = useForm({
    currentPassword: '',
    newPassword: '',
  })

  return (
    <Stack spacing={6} w="full">
      <Text color="fg.muted">Gerencie suas configurações de acesso</Text>
      <Stack
        spacing={6}
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/seguranca', {
            onSuccess: () => {
              reset()
            },
          })
        }}
        className="space-y-8"
      >
        <FormInput
          label="Senha atual"
          id="currentPassword"
          type="password"
          value={data.currentPassword}
          onChange={(e) => setData('currentPassword', e.target.value)}
        />

        <FormInput
          label="Nova senha"
          id="newPassword"
          type="password"
          value={data.newPassword}
          onChange={(e) => setData('newPassword', e.target.value)}
        />

        <Button type="submit" isLoading={processing}>
          Atualizar senha
        </Button>
      </Stack>
    </Stack>
  )
}

SecurityPage.layout = (page: ReactNode) => <SettingsLayout children={page} />

export default SecurityPage
