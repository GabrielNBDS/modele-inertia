import useUser from '@/hooks/use_user'
import AuthLayout from '../layout'
import { Button } from '@/components/button'

function Verify() {
  const { email } = useUser()

  return (
    <div className="text-center mt-4 flex flex-col gap-4">
      <p>
        Obrigado por se inscrever! Um link de verificação foi enviado para{' '}
        <span className="text-primary">{email}</span>, siga ele para verificar seu endereço.
      </p>

      <Button className="w-full">Já verifiquei</Button>

      <Button className="w-full" variant="outline">
        Reenviar e-mail
      </Button>
    </div>
  )
}

Verify.layout = (page: JSX.Element) => (
  <AuthLayout
    subtitle={<p className="text-muted-foreground">Verifique seu e-mail.</p>}
    children={page}
  />
)

export default Verify
