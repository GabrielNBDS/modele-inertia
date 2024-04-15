import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import Roles from '../../shared/enums/roles.js'
const AdminDashboardController = () => import('./use_cases/dashboard/controller.js')

router
  .group(() => {
    router.get('/', [AdminDashboardController, 'view'])
  })
  .prefix('/admin')
  .use(middleware.auth({ role: Roles.ADMIN }))
