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
const VerifyEmailController = () =>
  import('../app/modules/users/verify_email/verify_email_controller.js')
const RegisterController = () =>
  import('../app/modules/auth/use_cases/register/register_controller.js')
const UpdateUserController = () =>
  import('../app/modules/users/update_user/update_user_controller.js')
const ChangePasswordController = () =>
  import('../app/modules/users/change_password/change_password_controller.js')
const LoginController = () => import('../app/modules/auth/use_cases/login/login_controller.js')

router.get('/', ({ inertia }) => {
  return inertia.render('home')
})

router.get('/entrar', [LoginController, 'view']).middleware(middleware.guest())
router.post('/login', [LoginController, 'handle'])

router.get('/cadastrar', [RegisterController, 'view']).middleware(middleware.guest())
router.post('/register', [RegisterController, 'handle']).middleware(middleware.guest())

router
  .post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

router
  .get('/dashboard', ({ inertia }) => {
    return inertia.render('dashboard')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/perfil', [UpdateUserController, 'view'])
    router.post('/perfil', [UpdateUserController, 'handle'])
    router.post('/atualizar-email', [UpdateUserController, 'handleEmailUpdate'])
    router.get('/verificar-email', [VerifyEmailController, 'view'])
    router.post('/verificar-email', [VerifyEmailController, 'handle'])
    router.post('/verificar-email/reenviar', [VerifyEmailController, 'resend'])
    router.get('/seguranca', [ChangePasswordController, 'view'])
    router.post('/seguranca', [ChangePasswordController, 'handle'])
  })
  .prefix('/configuracoes')
  .use(middleware.auth())

router.post('/reenviar-email-de-verificacao', [VerifyEmailController, 'handle'])

router.on('/email-link').renderInertia('auth/magic-link')
router.on('/esqueci-minha-senha').renderInertia('auth/forgot-password')
