import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { changePasswordValidator } from './validator.js'

export default class ChangePasswordController {
  async view({ inertia }: HttpContext) {
    return inertia.render('settings/security')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)
    const user = auth.user!

    const passwordVerified = await hash.verify(user.password!, currentPassword)

    if (!passwordVerified) {
      session.flash('errors.currentPassword', 'Senha atual incorreta')

      return response.redirect().back()
    }

    user?.merge({ password: newPassword })

    await user.save()

    session.flash('notifications', [{ type: 'success', message: 'Senha atualizada!' }])

    return response.redirect().back()
  }
}
