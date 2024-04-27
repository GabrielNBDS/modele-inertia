import { HttpContext } from '@adonisjs/core/http'
import {
  forgotPasswordCodeValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from './validator.js'
import Code from '../../../../shared/models/code.js'
import User from '../../../../shared/models/user.js'
import CodeTypes from '../../../../shared/enums/code_types.js'
import mail from '@adonisjs/mail/services/main'
import db from '@adonisjs/lucid/services/db'
import modele from '#config/modele'

export default class ForgotPasswordController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  async changePassword({ session, request, response }: HttpContext) {
    const { code, email, password } = await request.validateUsing(resetPasswordValidator)

    session.flash('code', code)
    session.flash('email', email)

    if (!password || password.length < 8) {
      session.flash('notifications', [
        { type: 'error', message: 'A senha deve ter no mínimo 8 caracteres' },
      ])
      session.flash('codeValidated', true)
      return response.redirect().back()
    }

    const user = await User.findByOrFail('email', email)

    const foundCode = await Code.query()
      .where('userId', user.id)
      .andWhere('type', CodeTypes.FORGOT_PASSWORD)
      .andWhere('value', code)
      .first()

    if (!foundCode) {
      session.flash('notifications', [{ type: 'error', message: 'Código incorreto' }])
      session.flash('codeValidated', true)
      return response.redirect().back()
    }

    if (foundCode.isExpired()) {
      session.flash('notifications', [{ type: 'error', message: 'Código expirado' }])
      session.flash('codeValidated', true)
      return response.redirect().back()
    }

    if (foundCode && foundCode.metadata?.type === CodeTypes.FORGOT_PASSWORD) {
      user.password = password

      await db.transaction(async (trx) => {
        user.useTransaction(trx)
        foundCode.useTransaction(trx)

        await user.save()
        await foundCode.delete()
      })

      session.flash('notifications', [{ type: 'success', message: 'Senha alterada!' }])
      return response.redirect('/entrar')
    } else {
      session.flash('notifications', [{ type: 'error', message: 'Erro ao validar e-mail' }])
      session.flash('codeValidated', true)
      return response.redirect().back()
    }
  }

  async handle({ session, request, response }: HttpContext) {
    const { code, email } = await request.validateUsing(forgotPasswordCodeValidator)

    session.flash('email', email)

    if (!code || code === '') {
      session.flash('emailSent', true)
      session.flash('notifications', [{ type: 'error', message: 'Código inválido.' }])
      return response.redirect().back()
    }

    const user = await User.findByOrFail('email', email)

    const foundCode = await Code.query()
      .where('userId', user.id)
      .andWhere('type', CodeTypes.FORGOT_PASSWORD)
      .andWhere('value', code)
      .first()

    if (!foundCode) {
      session.flash('notifications', [{ type: 'error', message: 'Código incorreto' }])
      session.flash('emailSent', true)
      return response.redirect().back()
    }

    if (foundCode.isExpired()) {
      session.flash('notifications', [{ type: 'error', message: 'Código expirado' }])
      session.flash('emailSent', true)
      return response.redirect().back()
    }

    if (foundCode && foundCode.metadata?.type === CodeTypes.FORGOT_PASSWORD) {
      session.flash('notifications', [{ type: 'success', message: 'Código validado!' }])
      session.flash('codeValidated', true)
      session.flash('code', code)
      return response.redirect().back()
    } else {
      session.flash('notifications', [{ type: 'error', message: 'Erro ao validar e-mail' }])
      session.flash('emailSent', true)
      return response.redirect().back()
    }
  }

  async sendEmail({ session, request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findByOrFail('email', email)

    const code = await user.generateCode({ type: CodeTypes.FORGOT_PASSWORD })

    try {
      await mail.sendLater((message) => {
        message
          .to(email)
          .from(modele.mail.from, modele.mail.name)
          .subject('Troca de senha')
          .htmlView('mails/reset_password', { code: code.value, appName: modele.appName })
      })

      session.flash('notifications', [{ type: 'success', message: 'E-mail enviado!' }])
      session.flash('email', email)
      session.flash('emailSent', true)

      return response.redirect().back()
    } catch (error) {
      console.log(error)
      session.flash('notifications', [
        { type: 'error', message: 'Ocorreu um erro. Por favor, tente novamente.' },
      ])
      return response.redirect().back()
    }
  }
}
