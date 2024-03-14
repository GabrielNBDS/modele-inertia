import { Input } from '@/components/input'
import { Label } from '@/components/label'
import AuthLayout from '../layout'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/button'

function MagicLink() {
  return (
    <>
      <form className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <Button className="w-full">Enviar Link</Button>
      </form>

      <div className="text-center mt-4">
        <Link href="/entrar" className="font-medium text-primary hover:underline">
          Voltar
        </Link>
      </div>
    </>
  )
}

MagicLink.layout = (page: JSX.Element) => (
  <AuthLayout
    subtitle={
      <p className="text-muted-foreground">
        Digite seu e-mail para receber um link de recuperação de senha.
      </p>
    }
    children={page}
  />
)

export default MagicLink
