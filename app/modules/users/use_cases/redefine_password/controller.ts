import { HttpContext } from '@adonisjs/core/http'
import { redefinePasswordValidator } from './validator.js'

export default class RedefinePasswordController {
  async view({ session, inertia, response }: HttpContext) {
    if (!session.get('first-login')) {
      return response.redirect('/dashboard')
    }

    return inertia.render('auth/redefine-password')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const user = auth.user!

    const payload = await request.validateUsing(redefinePasswordValidator)

    user.merge(payload)

    try {
      await user.save()

      session.put('first-login', false)

      session.flash('notifications', [{ type: 'success', message: 'Senha redefinida!' }])

      return response.redirect('/dashboard')
    } catch (error) {
      console.log(error)
      response.redirect().back()
    }
  }
}
