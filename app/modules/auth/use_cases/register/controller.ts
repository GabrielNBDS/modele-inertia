import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import mail from '@adonisjs/mail/services/main'
import { registerValidator } from './validator.js'
import db from '@adonisjs/lucid/services/db'
import CodeTypes from '../../../../shared/enums/code_types.js'
import { DateTime } from 'luxon'

export default class RegisterController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/sign-up')
  }

  async handle({ session, request, response }: HttpContext) {
    await db.transaction(async (trx) => {
      const { name, email, password } = await request.validateUsing(registerValidator)

      let code = ''
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
      }

      const user = new User()

      user.useTransaction(trx)

      user.merge({ name, email, password })

      await user.save()

      await user.related('codes').create({
        userId: user.id,
        value: code,
        metadata: { type: CodeTypes.REGISTERED_USER },
        expiresAt: DateTime.now().plus({ minutes: 30 }),
      })

      await mail.sendLater((message) => {
        message
          .to(email)
          .from('contato@lis-software.com.br')
          .subject('Verifique seu endereço de e-mail')
          .htmlView('mails/verify_email', { code })
      })

      session.flash('notifications', [{ type: 'success', message: 'Conta criada!' }])

      return response.redirect('/entrar')
    })
  }
}
