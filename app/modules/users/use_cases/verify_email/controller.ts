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

    const foundCode = await Code.query().where('user_id', user.id).andWhere('value', code).first()

    if (!foundCode) {
      session.flash('notifications', [{ type: 'error', message: 'Código incorreto' }])
      return response.redirect().back()
    }

    if (foundCode.isExpired()) {
      session.flash('notifications', [{ type: 'error', message: 'Código expirado' }])
      return response.redirect().back()
    }

    if (foundCode && foundCode.metadata?.type === CodeTypes.REGISTERED_USER) {
      user.verifiedEmail = true

      await db.transaction(async (trx) => {
        user.useTransaction(trx)
        foundCode.useTransaction(trx)

        await user.save()
        await foundCode.delete()
      })

      session.flash('notifications', [{ type: 'success', message: 'E-mail validado!' }])

      return response.redirect('/dashboard')
    } else {
      session.flash('notifications', [{ type: 'error', message: 'Erro ao validar e-mail' }])
      return response.redirect().back()
    }
  }

  async resend({ auth, session, response }: HttpContext) {
    console.log('1 -----------')
    try {
      const user = auth.user!

      let code = ''
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
      }

      await user.save()

      await mail.sendLater((message) => {
        message
          .to(user.email)
          .from('contato@lis-software.com.br')
          .subject('Verify your email address')
          .htmlView('mails/verify_email', { code })
      })

      session.flash('notifications', [{ type: 'success', message: 'E-mail enviado!' }])

      response.redirect().back()
    } catch (error) {
      console.log(error)
    }
  }
}
