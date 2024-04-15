import FormControl from '@/components/form_control'
import { Button, Stack } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'

export default function ForgotPasswordFirstStep() {
  const { setData, post, processing } = useForm({
    email: '',
  })

  return (
    <Stack
      spacing="6"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        post('/esqueci-minha-senha')
      }}
    >
      <FormControl
        label="E-mail"
        id="email"
        type="email"
        onChange={(e) => setData('email', e.target.value)}
      />

      <Button type="submit" isLoading={processing} className="w-full">
        Enviar código
      </Button>
    </Stack>
  )
}
