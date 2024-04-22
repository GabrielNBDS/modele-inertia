import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthenticateSessionMiddleware {
  async handle({ auth, session, response }: HttpContext, next: NextFn) {
    if (
      (await auth.check()) &&
      (!session.has('session-token') ||
        !(await auth
          .user!.related('sessions')
          .query()
          .where('sessionToken', session.get('session-token'))
          .first()))
    ) {
      await auth.use('web').logout()

      return response.redirect('/')
    }

    const output = await next()
    return output
  }
}
