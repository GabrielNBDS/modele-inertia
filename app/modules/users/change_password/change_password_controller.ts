import { HttpContext } from '@adonisjs/core/http'
import { changePasswordValidator } from './change_password_validator.js'
import hash from '@adonisjs/core/services/hash'

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

    return response.redirect().back()
  }
}
