import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { verifyEmailValidator } from './verify_email_validator.js'

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

    if (code !== user.code) {
      session.flash('notifications', [{ type: 'error', message: 'Código Incorreto' }])

      return response.redirect().back()
    }

    user.verifiedEmail = true
    user.code = undefined
    await user.save()

    session.flash('notifications', [{ type: 'success', message: 'E-mail validado!' }])

    return response.redirect('/dashboard')
  }

  async resend({ auth, session, response }: HttpContext) {
    console.log('1 -----------')
    try {
      const user = auth.user!

      let code = ''
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
      }

      user.code = code

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
