import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import { loginValidator } from './validator.js'

export default class LoginController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect().toPath('/')
    } catch (error) {
      session.flash('errors.auth', 'Credenciais inválidas')
      return response.redirect().back()
    }
  }
}
