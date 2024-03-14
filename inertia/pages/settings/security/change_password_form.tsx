import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { LoadingButton } from '@/components/loading_button'
import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'

export default function ChangePasswordForm() {
  const { data, setData, post, processing, reset } = useForm({
    currentPassword: '',
    newPassword: '',
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        post('/configuracoes/seguranca', {
          onSuccess: () => {
            toast.success('Senha atualizada!')
            reset()
          },
        })
      }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Senha atual</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={data.currentPassword}
          onChange={(e) => setData('currentPassword', e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Nova senha</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={data.newPassword}
          onChange={(e) => setData('newPassword', e.target.value)}
        />
      </div>

      <LoadingButton loading={processing}>Atualizar senha</LoadingButton>
    </form>
  )
}
