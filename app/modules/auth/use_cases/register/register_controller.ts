import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import { registerValidator } from './register_validator.js'
import mail from '@adonisjs/mail/services/main'

export default class RegisterController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/sign-up')
  }

  async handle({ session, request, response }: HttpContext) {
    const { name, email, password } = await request.validateUsing(registerValidator)

    let code = ''
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10)
    }

    await User.create({ name, email, password, code })

    await mail.sendLater((message) => {
      message
        .to(email)
        .from('contato@lis-software.com.br')
        .subject('Verifique seu endereço de e-mail')
        .htmlView('mails/verify_email', { code })
    })

    session.flash('notifications', [{ type: 'success', message: 'Conta criada!' }])

    return response.redirect('/entrar')
  }
}
