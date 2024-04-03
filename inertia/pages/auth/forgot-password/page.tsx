import useFlash from '@/hooks/use_flash'
import AuthLayout from '../layout'
import { Link } from '@inertiajs/react'
import ForgotPasswordFirstStep from './first_step'
import ForgotPasswordSecondStep from './second_step'
import ForgotPasswordThirdStep from './third_step'

function ForgotPassword() {
  const { emailSent, codeValidated } = useFlash<{ emailSent: boolean; codeValidated: boolean }>()

  return (
    <>
      <p className="text-muted-foreground text-center mb-6">
        {!emailSent &&
          !codeValidated &&
          'Digite seu e-mail para receber um link de recuperação de senha.'}
        {emailSent && 'Um e-mail com um código de confirmação foi enviado. Digite-o abaixo'}
        {codeValidated && 'Último passo, escolha uma nova senha'}
      </p>

      {!emailSent && !codeValidated && <ForgotPasswordFirstStep />}

      {emailSent && <ForgotPasswordSecondStep />}

      {codeValidated && <ForgotPasswordThirdStep />}

      <div className="text-center mt-4">
        <Link href="/entrar" className="font-medium text-primary hover:underline">
          Voltar
        </Link>
      </div>
    </>
  )
}

ForgotPassword.layout = (page: JSX.Element) => {
  return <AuthLayout children={page} />
}

export default ForgotPassword
