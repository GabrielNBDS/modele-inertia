import { HttpContext } from '@adonisjs/core/http'
import { forgotPasswordValidator } from './validator.js'

export default class ForgotPasswordController {
  async view({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  async handle({ session, request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)
  }
}
