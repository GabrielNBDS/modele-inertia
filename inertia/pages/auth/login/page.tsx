import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { FcGoogle } from 'react-icons/fc'
import { LuLock, LuSend } from 'react-icons/lu'
import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { LoadingButton } from '@/components/loading_button'
import useError from '@/hooks/use_error'
import { Alert, AlertDescription, AlertTitle } from '@/components/alert'
import { toast } from 'sonner'

function Login() {
  const error = useError('auth')
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        post('/login', {
          onSuccess: () => {
            toast.success('Bem-vindo!')
          },
        })
      }}
      className="space-y-6"
    >
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

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
        />
      </div>
      <div>
        <div className="mb-5 flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={data.remember}
              onCheckedChange={(e) => setData('remember', !!e)}
            />
            <Label htmlFor="remember">Lembrar de mim</Label>
          </div>
          <Link
            href="/esqueci-minha-senha"
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            Esqueci a senha
          </Link>
        </div>
        {(error?.length ?? 0) > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>
              <LuLock className="h-4 w-4" />
              Erro
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <LoadingButton type="submit" className="w-full" loading={processing}>
          Entrar
        </LoadingButton>

        <div className="my-5 flex items-center">
          <span aria-hidden="true" className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75" />
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            Ou entre com
          </span>
          <span aria-hidden="true" className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" className="gap-2" asChild>
            <a href="">
              <FcGoogle />
              Google
            </a>
          </Button>

          <Button variant="secondary" className="gap-2" asChild>
            <Link href="/email-link">
              <LuSend />
              E-mail Link
            </Link>
          </Button>
        </div>
      </div>
    </form>
  )
}

Login.layout = (page: JSX.Element) => (
  <AuthLayout
    subtitle={
      <p className="text-muted-foreground">
        Entre na sua conta ou{' '}
        <Link className="text-primary hover:underline" href="/cadastrar">
          cadastre-se
        </Link>
      </p>
    }
    children={page}
  />
)

export default Login
