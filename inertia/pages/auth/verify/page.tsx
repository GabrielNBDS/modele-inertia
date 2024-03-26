import useUser from '@/hooks/use_user'
import AuthLayout from '../layout'
import { Button } from '@/components/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input_otp'
import { router, useForm } from '@inertiajs/react'
import { LoadingButton } from '@/components/loading_button'

function Verify() {
  const { email } = useUser()!

  const { setData, post, processing } = useForm({
    code: '',
  })

  return (
    <div className="text-center mt-4 flex flex-col gap-4">
      <p>
        Obrigado por se inscrever! Um código de verificação foi enviado para{' '}
        <span className="text-primary">{email}</span>, digite-o aqui para verificar seu e-mail.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/verificar-email')
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
          Verificar E-mail
        </LoadingButton>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          try {
            router.post('/configuracoes/verificar-email/reenviar')
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <Button type="submit" className="w-full" variant="outline">
          Reenviar e-mail
        </Button>
      </form>
    </div>
  )
}

Verify.layout = (page: JSX.Element) => (
  <AuthLayout
    subtitle={<p className="text-muted-foreground">Verifique seu e-mail.</p>}
    children={page}
  />
)

export default Verify
