import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { confirmEmailUpdateValidator, updateUserValidator } from './validator.js'
import Code from '../../../../shared/models/code.js'
import db from '@adonisjs/lucid/services/db'
import CodeTypes from '../../../../shared/enums/code_types.js'
import modele from '#config/modele'

export default class UpdateUserController {
  async view({ inertia }: HttpContext) {
    return inertia.render('settings/profile')
  }

  async handleEmailUpdate({ auth, request, session, response }: HttpContext) {
    const user = auth.user!
    const { code } = await request.validateUsing(confirmEmailUpdateValidator)

    const foundCode = await Code.query()
      .where('user_id', user.id)
      .andWhere('value', code ?? '')
      .first()

    if (!foundCode) {
      session.flash('emailChanged', true)
      session.flash('notifications', [{ type: 'error', message: 'Código incorreto' }])
      return response.redirect().back()
    }

    if (foundCode.isExpired()) {
      session.flash('emailChanged', true)
      session.flash('notifications', [{ type: 'error', message: 'Código expirado' }])
      return response.redirect().back()
    }

    if (
      foundCode &&
      foundCode.type === CodeTypes.EMAIL_UPDATE &&
      typeof foundCode.metadata?.desiredEmail === 'string'
    ) {
      user.email = foundCode.metadata.desiredEmail

      await db.transaction(async (trx) => {
        user.useTransaction(trx)
        foundCode.useTransaction(trx)

        await user.save()
        await foundCode.delete()
      })

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
      const code = await user.generateCode({
        type: CodeTypes.EMAIL_UPDATE,
        metadata: { desiredEmail: email },
      })

      try {
        await mail.sendLater((message) => {
          message
            .to(email)
            .from(modele.mail.from, modele.mail.name)
            .subject('Confirme seu novo endereço de e-mail')
            .htmlView('mails/change_email', { code: code.value, appName: modele.appName })
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

    session.flash('notifications', [{ type: 'success', message: 'Perfil atualizado!' }])

    return response.redirect().back()
  }
}
