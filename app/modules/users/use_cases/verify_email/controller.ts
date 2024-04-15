import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { verifyEmailValidator } from './validator.js'
import Code from '../../../../shared/models/code.js'
import CodeTypes from '../../../../shared/enums/code_types.js'
import db from '@adonisjs/lucid/services/db'

export default class VerifyEmailController {
  async view({ auth, inertia, response }: HttpContext) {
    if (auth.user!.verifiedEmail) {
      return response.redirect('/dashboard')
    }

    return inertia.render('auth/verify')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const user = auth.user!

    const { code } = await request.validateUsing(verifyEmailValidator)

    const foundCode = await Code.query()
      .where('userId', user.id)
      .andWhere('type', CodeTypes.REGISTERED_USER)
      .andWhere('value', code)
      .first()

    if (!foundCode) {
      session.flash('notifications', [{ type: 'error', message: 'Código incorreto' }])
      return response.redirect().back()
    }

    if (foundCode.isExpired()) {
      session.flash('notifications', [{ type: 'error', message: 'Código expirado' }])
      return response.redirect().back()
    }

    user.verifiedEmail = true

    await db.transaction(async (trx) => {
      user.useTransaction(trx)
      foundCode.useTransaction(trx)

      await user.save()
      await foundCode.delete()
    })

    session.flash('notifications', [{ type: 'success', message: 'E-mail validado!' }])

    return response.redirect('/dashboard')
  }

  async resend({ auth, session, response }: HttpContext) {
    try {
      const user = auth.user!

      const code = await user.generateCode({
        type: CodeTypes.REGISTERED_USER,
      })

      await mail.sendLater((message) => {
        message
          .to(user.email)
          .from('contato@lis-software.com.br', 'Modèle')
          .subject('Verify your email address')
          .htmlView('mails/verify_email', { code: code.value })
      })

      session.flash('notifications', [{ type: 'success', message: 'E-mail enviado!' }])

      response.redirect().back()
    } catch (error) {
      console.log(error)
    }
  }
}
