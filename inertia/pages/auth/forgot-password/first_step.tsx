import { Input } from '@/components/input'
import { LoadingButton } from '@/components/loading_button'
import { useForm } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'

export default function ForgotPasswordFirstStep() {
  const { setData, post, processing } = useForm({
    email: '',
  })

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          post('/esqueci-minha-senha')
        }}
      >
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            onChange={(e) => setData('email', e.target.value)}
          />
        </div>

        <LoadingButton loading={processing} className="w-full">
          Enviar Link
        </LoadingButton>
      </form>
    </>
  )
}
