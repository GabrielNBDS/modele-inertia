import FormControl from '@/components/form_control'
import useFlash from '@/hooks/use_flash'
import { Button, Stack } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'

export default function ForgotPasswordThirdStep() {
  const { email, code } = useFlash<{ email?: string; code?: string }>()

  const { setData, post, processing } = useForm({
    password: '',
    code,
    email,
  })

  return (
    <Stack
      spacing="6"
      as="form"
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        post('/esqueci-minha-senha/trocar-senha')
      }}
    >
      <FormControl
        label="Nova Senha"
        id="password"
        type="password"
        onChange={(e) => setData('password', e.target.value)}
      />

      <Button type="submit" isLoading={processing} w="full">
        Trocar Senha
      </Button>
    </Stack>
  )
}
