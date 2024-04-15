import { HttpContext } from '@adonisjs/core/http'
import Bowser from 'bowser'
import { DateTime } from 'luxon'

export default class SessionsController {
  async view({ auth, inertia, session: currentSession }: HttpContext) {
    const sessions = await auth.user!.related('sessions').query().orderBy('last_active_at', 'desc')

    return inertia.render('settings/sessions', {
      sessions: sessions.map((session) => {
        return {
          id: session.id,
          agent: Bowser.parse(session.userAgent),
          ipAddress: session.ipAddress,
          lastActiveAt: session.lastActiveAt,
          isCurrentSession: session.id === currentSession.sessionId,
        }
      }) as {
        id: string
        agent: Bowser.Parser.ParsedResult
        ipAddress: string
        lastActiveAt: DateTime<boolean>
        isCurrentSession: boolean
      }[],
    })
  }

  async delete({ auth, session, request, response }: HttpContext) {
    const id = request.param('id')
    await auth.user!.related('sessions').query().where('id', id).delete()

    session.flash('notifications', [{ type: 'success', message: 'Sessão deslogada' }])

    return response.redirect().back()
  }
}
