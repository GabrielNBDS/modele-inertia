import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import Roles from '../../shared/enums/roles.js'
const AdminUsersController = () => import('./use_cases/users/controller.js')
const AdminDashboardController = () => import('./use_cases/dashboard/controller.js')

router
  .group(() => {
    router.get('/dashboard', [AdminDashboardController, 'view'])
    router.get('/usuarios', [AdminUsersController, 'index'])
    router.get('/usuarios/:id', [AdminUsersController, 'read'])
    router.get('/usuarios/:id/editar', [AdminUsersController, 'edit'])
    router.put('/usuarios/:id/editar', [AdminUsersController, 'update'])
  })
  .prefix('/admin')
  .use(middleware.auth({ role: Roles.ADMIN }))
