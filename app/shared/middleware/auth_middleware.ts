import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import Roles from '../enums/roles.js'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/entrar'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
      role?: Roles
    } = {}
  ) {
    const user = await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })

    if (options.role && user.roleId !== options.role) {
      return ctx.response.unauthorized('Unauthorized access')
    }

    if (!user.verifiedEmail) {
      if (
        ctx.request.url() !== '/configuracoes/verificar-email' &&
        ctx.request.url() !== '/configuracoes/verificar-email/reenviar'
      ) {
        return ctx.response.redirect('/configuracoes/verificar-email')
      }
    }

    return next()
  }
}
