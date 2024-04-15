import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import { loginValidator } from './validator.js'
import Session from '../../../../shared/models/session.js'
import { v4 as uuidv4 } from 'uuid'

export default class LoginController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user, true)

      const sessionToken = uuidv4()

      await Session.create({
        id: session.sessionId,
        userId: user.id,
        ipAddress: request.ip(),
        userAgent: request.header('User-Agent'),
        sessionToken,
      })

      session.put('session-token', sessionToken)

      session.flash('notifications', [{ type: 'success', message: 'Bem-vindo!' }])
      return response.redirect().toPath('/dashboard')
    } catch (error) {
      auth.use('web').logout()

      if (error.code === 'E_INVALID_CREDENTIALS') {
        session.flash('errors.auth', 'Credenciais inválidas')
      } else {
        session.flash('errors.auth', 'Ocorreu um erro. Tente novamente mais tarde')
      }

      return response.redirect().back()
    }
  }
}
