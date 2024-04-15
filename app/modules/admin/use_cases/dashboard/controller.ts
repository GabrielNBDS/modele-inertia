import { HttpContext } from '@adonisjs/core/http'

export default class AdminDashboardController {
  async view({ inertia }: HttpContext) {
    return inertia.render('admin/dashboard')
  }
}
