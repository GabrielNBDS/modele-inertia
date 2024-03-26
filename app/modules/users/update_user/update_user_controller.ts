import { HttpContext } from '@adonisjs/core/http'
import { confirmEmailUpdateValidator, updateUserValidator } from './update_user_validator.js'
import mail from '@adonisjs/mail/services/main'

export default class UpdateUserController {
  async view({ inertia }: HttpContext) {
    return inertia.render('settings/profile')
  }

  async handleEmailUpdate({ auth, request, session, response }: HttpContext) {
    const user = auth.user!
    const { code } = await request.validateUsing(confirmEmailUpdateValidator)

    if (user.code === code && user.desiredEmail) {
      user.email = user.desiredEmail
      user.code = undefined
      user.desiredEmail = undefined

      await user.save()

      session.flash('notifications', [{ type: 'success', message: 'E-mail atualizado!' }])
    } else {
      session.flash('emailChanged', true)
      session.flash('notifications', [{ type: 'error', message: 'Erro ao confirmar e-mail' }])
    }

    response.redirect().back()
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const user = auth.user!

    const { name, email } = await request.validateUsing(updateUserValidator, {
      meta: {
        userId: user!.id,
      },
    })

    user?.merge({ name })

    if (email !== user.email) {
      user.desiredEmail = email

      let code = ''
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
      }

      user.code = code

      try {
        await mail.sendLater((message) => {
          message
            .to(email)
            .from('contato@lis-software.com.br')
            .subject('Confirme seu novo endereço de e-mail')
            .htmlView('mails/change_email', { code })
        })

        session.flash('emailChanged', true)
      } catch (error) {
        console.log(error)
        session.flash(
          'errors.email',
          'Ocorreu um erro ao trocar seu e-mail. Por favor, tente novamente.'
        )
        return response.redirect().back()
      }
    }

    await user.save()

    return response.redirect().back()
  }
}
