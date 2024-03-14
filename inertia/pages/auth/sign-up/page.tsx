import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { FcGoogle } from 'react-icons/fc'
import { LuSend } from 'react-icons/lu'
import AuthLayout from '../layout'
import { Link } from '@inertiajs/react'

function SignUp() {
  return (
    <form className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <div>
        <Button className="w-full">Cadastrar</Button>

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
