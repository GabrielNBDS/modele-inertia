import { Input } from '@/components/input'
import { LoadingButton } from '@/components/loading_button'
import useFlash from '@/hooks/use_flash'
import { useForm } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'

export default function ForgotPasswordThirdStep() {
  const { email, code } = useFlash<{ email?: string; code?: string }>()

  const { setData, post, processing } = useForm({
    password: '',
    code,
    email,
  })

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          post('/esqueci-minha-senha/trocar-senha')
        }}
      >
        <div className="space-y-1">
          <Label htmlFor="email">Nova Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setData('password', e.target.value)}
          />
        </div>

        <LoadingButton loading={processing} className="w-full">
          Trocar Senha
        </LoadingButton>
      </form>
    </>
  )
}
