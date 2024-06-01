import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import { loginValidator } from './validator.js'
import Session from '../../../../shared/models/session.js'
import { v4 as uuidv4 } from 'uuid'
import limiter from '@adonisjs/limiter/services/main'

export default class LoginController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const loginLimiter = limiter.use({
      requests: 5,
      duration: '1 min',
      blockDuration: '10 mins',
    })

    try {
      const [error, user] = await loginLimiter.penalize(`login_${request.ip()}`, () => {
        return User.verifyCredentials(email, password)
      })

      if (error) {
        session.flashAll()
        session.flash('notifications', [
          {
            type: 'error',
            message: 'Muitas tentativas. Tente novamente em 10 minutos.',
            duration: 10000,
          },
        ])
        return response.redirect().back()
      }

      await auth.use('web').login(user)

      const sessionToken = uuidv4()

      await Session.create({
        id: session.sessionId,
        userId: user.id,
        ipAddress: request.ip(),
        userAgent: request.header('User-Agent'),
        sessionToken,
      })

      session.put('session-token', sessionToken)

      if (password === '123456') {
        session.put('first-login', true)
      }

      session.flash('notifications', [{ type: 'success', message: 'Bem-vindo!' }])
      return response.redirect().toPath('/dashboard')
    } catch (error) {
      auth.use('web').logout()

      if (error.code === 'E_INVALID_CREDENTIALS') {
        session.flash('errors.auth', 'Credenciais inválidas')
      } else {
        session.flash('errors.auth', 'Tente novamente mais tarde')
      }

      return response.redirect().back()
    }
  }
}
