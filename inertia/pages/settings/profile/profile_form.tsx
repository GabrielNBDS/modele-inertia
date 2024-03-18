import { Alert, AlertDescription, AlertTitle } from '@/components/alert'
import { Input } from '@/components/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/input_otp'
import { Label } from '@/components/label'
import { LoadingButton } from '@/components/loading_button'
import useFlash from '@/hooks/use_flash'
import useUser from '@/hooks/use_user'
import { useForm } from '@inertiajs/react'
import { LuAlertCircle } from 'react-icons/lu'
import { toast } from 'sonner'

export default function ProfileForm() {
  const { emailChanged, ...rest } = useFlash<{ emailChanged?: boolean }>()
  console.log(rest)
  const user = useUser()

  const { data, setData, post, processing } = useForm({
    name: user!.name,
    email: user!.email,
  })

  const {
    setData: setCodeData,
    post: postCode,
    processing: processingCode,
  } = useForm({
    code: '',
  })

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          post('/configuracoes/perfil', {
            onSuccess: () => {
              toast.success('Perfil Atualizado!')
            },
          })
        }}
        className="space-y-8"
      >
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
        </div>

        <LoadingButton loading={processing}>Atualizar Perfil</LoadingButton>
      </form>

      {emailChanged && (
        <>
          <Alert variant="info" className="mt-4">
            <AlertTitle>
              <LuAlertCircle className="h-4 w-4" />
              Atenção
            </AlertTitle>
            <AlertDescription>
              Para confirmar a atualização do seu endereço de e-mail, foi enviado um código para o
              e-mail desejado. Digite o código abaixo para confirmar a troca de endereço.
            </AlertDescription>
          </Alert>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              postCode('/configuracoes/atualizar-email')
            }}
          >
            <InputOTP
              onChange={(e) => setCodeData('code', e)}
              className="my-3"
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

            <LoadingButton loading={processingCode}>Confirmar Código</LoadingButton>
          </form>
        </>
      )}
    </>
  )
}
