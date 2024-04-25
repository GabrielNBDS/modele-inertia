import { HttpContext } from '@adonisjs/core/http'
import User from '../../../../shared/models/user.js'
import { createUserValidator, updateUserValidator } from './validator.js'

export default class AdminUsersController {
  async index({ inertia, request }: HttpContext) {
    const perPage = 10

    const users = await User.query()
      .orderBy('createdAt', 'asc')
      .paginate(Number(request.input('page', 1)), perPage)

    users.baseUrl('/admin/usuarios')

    return inertia.render('admin/users', { users })
  }

  async read({ inertia, request }: HttpContext) {
    const id = request.param('id')

    const user = await User.findOrFail(id)

    return inertia.render('admin/users/read', { user: user })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/users/create')
  }

  async store({ session, request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = await User.create({ ...payload, password: '123456' })

    session.flash('notifications', [{ type: 'success', message: 'Usuário criado!' }])

    return response.redirect(`/admin/usuarios/${user.id}`)
  }

  async edit({ inertia, request }: HttpContext) {
    const id = request.param('id')

    const user = await User.findOrFail(id)

    return inertia.render('admin/users/edit', { user })
  }

  async update({ session, request, response }: HttpContext) {
    const id = request.param('id')

    try {
      const user = await User.findOrFail(id)

      const payload = await request.validateUsing(updateUserValidator, {
        meta: {
          userId: user.id,
        },
      })

      user.merge(payload)

      await user.save()

      session.flash('notifications', [{ type: 'success', message: 'Usuário editado' }])

      return response.redirect(`/admin/usuarios/${user.id}`)
    } catch (error) {
      console.log(error)
    }
  }
}
