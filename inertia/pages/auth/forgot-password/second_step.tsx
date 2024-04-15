import useFlash from '@/hooks/use_flash'
import { Button, HStack, PinInput, PinInputField, Stack } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'

export default function ForgotPasswordSecondStep() {
  const { email } = useFlash<{ email?: string }>()

  const { setData, post, processing } = useForm({
    code: '',
    email: email,
  })

  return (
    <>
      <Stack
        spacing="6"
        onSubmit={(e) => {
          e.preventDefault()
          post('/esqueci-minha-senha/codigo')
        }}
      >
        <HStack mx="auto">
          <PinInput onChange={(e) => setData('code', e)} size="lg">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <Button type="submit" isLoading={processing}>
          Confirmar código
        </Button>
      </Stack>
    </>
  )
}
