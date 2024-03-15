import { Alert, AlertDescription, AlertTitle } from '@/components/alert'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { LoadingButton } from '@/components/loading_button'
import usePageProps from '@/hooks/use_page_props'
import useUser from '@/hooks/use_user'
import { useForm } from '@inertiajs/react'
import { LuAlertCircle } from 'react-icons/lu'
import { toast } from 'sonner'

export default function ProfileForm() {
  const { emailChanged } = usePageProps<{ emailChanged?: boolean }>()
  const user = useUser()

  const { data, setData, post, processing } = useForm({
    name: user!.name,
    email: user!.email,
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

        {emailChanged && (
          <Alert variant="info" className="mb-4">
            <AlertTitle>
              <LuAlertCircle className="h-4 w-4" />
              Atenção
            </AlertTitle>
            <AlertDescription>
              Para confirmar a atualização do seu endereço de e-mail, foi enviado um link para o
              e-mail desejado. Ao acessá-lo, seu endereço de e-mail será atualizado.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <LoadingButton loading={processing}>Atualizar Perfil</LoadingButton>
    </form>
  )
}
