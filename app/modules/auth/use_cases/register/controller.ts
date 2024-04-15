import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import mail from '@adonisjs/mail/services/main'
import { registerValidator } from './validator.js'
import CodeTypes from '../../../../shared/enums/code_types.js'

export default class RegisterController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/sign-up')
  }

  async handle({ session, request, response }: HttpContext) {
    const { name, email, password } = await request.validateUsing(registerValidator)

    const user = await User.create({ name, email, password })

    const code = await user.generateCode({
      type: CodeTypes.REGISTERED_USER,
    })

    await mail.sendLater((message) => {
      message
        .to(email)
        .from('contato@lis-software.com.br', 'Modèle')
        .subject('Verifique seu endereço de e-mail')
        .htmlView('mails/verify_email', { code: code.value })
    })

    session.flash('notifications', [{ type: 'success', message: 'Conta criada!' }])

    return response.redirect('/entrar')
  }
}
