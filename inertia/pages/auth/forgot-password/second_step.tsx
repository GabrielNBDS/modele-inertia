import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input_otp'
import { LoadingButton } from '@/components/loading_button'
import useFlash from '@/hooks/use_flash'
import { useForm } from '@inertiajs/react'

export default function ForgotPasswordSecondStep() {
  const { email } = useFlash<{ email?: string }>()

  const { setData, post, processing } = useForm({
    code: '',
    email: email,
  })

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          post('/esqueci-minha-senha/codigo')
        }}
      >
        <InputOTP
          className="mx-auto max-w-max mb-4"
          onChange={(e) => setData('code', e)}
          maxLength={6}
          render={({ slots }) => (
            <>
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            </>
          )}
        />

        <LoadingButton loading={processing} className="w-full">
          Confirmar código
        </LoadingButton>
      </form>
    </>
  )
}
