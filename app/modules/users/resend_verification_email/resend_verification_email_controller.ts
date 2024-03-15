import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class ResendVerificationEmailController {
  async handle({ auth, response }: HttpContext) {
    const user = auth.user!

    await mail.sendLater((message) => {
      message
        .to(user.email)
        .from('info@example.org')
        .subject('Verify your email address')
        .htmlView('emails/verify_email', { user })
    })

    response.redirect().back()
  }
}
