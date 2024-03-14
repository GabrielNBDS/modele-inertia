import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { LoadingButton } from '@/components/loading_button'
import useUser from '@/hooks/use_user'
import { useForm } from '@inertiajs/react'
import { toast } from 'sonner'

export default function ProfileForm() {
  const user = useUser()

  const { data, setData, post, processing } = useForm({
    name: user.name,
    email: user.email,
  })

  return (
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
        <Label htmlFor="email">Nome</Label>
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
  )
}
