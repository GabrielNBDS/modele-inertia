import { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from './update_user_validator.js'

export default class UpdateUserController {
  async view({ inertia }: HttpContext) {
    return inertia.render('settings/profile')
  }

  async handle({ auth, session, request, response }: HttpContext) {
    const user = auth.user!

    const { name, email } = await request.validateUsing(updateUserValidator, {
      meta: {
        userId: user!.id,
      },
    })

    user?.merge({ name })

    if (email !== user.email) {
      user.desiredEmail = email

      session.flash('emailChanged', true)
    }

    await user.save()

    return response.redirect().back()
  }
}
