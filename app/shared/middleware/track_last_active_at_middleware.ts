import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class TrackLastActiveAtMiddleware {
  async handle({ auth, session }: HttpContext, next: NextFn) {
    if (await auth.check()) {
      await auth
        .user!.related('sessions')
        .query()
        .where('id', session.sessionId)
        .update({ lastActiveAt: DateTime.now().toISO() })
    }
    const output = await next()
    return output
  }
}
