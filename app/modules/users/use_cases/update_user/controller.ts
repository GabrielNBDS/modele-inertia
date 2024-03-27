import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { confirmEmailUpdateValidator, updateUserValidator } from './validator.js'
import Code from '../../../../shared/models/code.js'
import db from '@adonisjs/lucid/services/db'
import CodeTypes from '../../../../shared/enums/code_types.js'
import { DateTime } from 'luxon'

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
      foundCode.metadata?.type === CodeTypes.EMAIL_UPDATE &&
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
      let code = ''
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
      }

      await Code.create({
        userId: user.id,
        value: code,
        expiresAt: DateTime.now().plus({ minutes: 30 }),
        metadata: { type: CodeTypes.EMAIL_UPDATE, desiredEmail: email },
      })

      try {
        await mail.sendLater((message) => {
          message
            .to(email)
            .from('contato@lis-software.com.br', 'Modèle')
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