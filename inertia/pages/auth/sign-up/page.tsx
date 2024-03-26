import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { FcGoogle } from 'react-icons/fc'
import { LuSend } from 'react-icons/lu'
import AuthLayout from '../layout'
import { Link, useForm } from '@inertiajs/react'
import { LoadingButton } from '@/components/loading_button'

function SignUp() {
  const { data, setData, post, processing } = useForm({
    name: '',
    email: '',
    password: '',
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        post('/register')
      }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input onChange={(e) => setData('name', e.target.value)} id="name" name="name" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          onChange={(e) => setData('email', e.target.value)}
          id="email"
          name="email"
          type="email"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input
          onChange={(e) => setData('password', e.target.value)}
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <div>
        <LoadingButton loading={processing} className="w-full">
          Cadastrar
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

SignUp.layout = (page: JSX.Element) => (
  <AuthLayout
    subtitle={
      <p className="text-muted-foreground">
        Cadastre-se ou{' '}
        <Link className="text-primary hover:underline" href="/entrar">
          faça login
        </Link>
      </p>
    }
    children={page}
  />
)

export default SignUp
