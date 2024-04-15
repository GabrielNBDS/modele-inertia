/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import '../app/modules/auth/routes.js'
import '../app/modules/users/routes.js'
import '../app/modules/admin/routes.js'

router.get('/', ({ auth, inertia, response }) => {
  if (auth.user) {
    return response.redirect('/dashboard')
  }
  return inertia.render('home')
})

router
  .get('/dashboard', ({ inertia }) => {
    return inertia.render('dashboard')
  })
  .use(middleware.auth())
