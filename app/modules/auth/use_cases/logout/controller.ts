import { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ auth, response, session }: HttpContext) {
    await auth.user!.related('sessions').query().where('id', session.sessionId).delete()

    await auth.use('web').logout()
    return response.redirect('/')
  }
}
