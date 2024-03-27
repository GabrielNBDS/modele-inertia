import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LoginController = () => import('./use_cases/login/controller.js')
const RegisterController = () => import('./use_cases/register/controller.js')

router.get('/entrar', [LoginController, 'view']).middleware(middleware.guest())
router.post('/login', [LoginController, 'handle'])

router
  .post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

router.get('/cadastrar', [RegisterController, 'view']).middleware(middleware.guest())
router.post('/register', [RegisterController, 'handle']).middleware(middleware.guest())

router.on('/esqueci-minha-senha').renderInertia('auth/forgot-password')

router.on('/email-link').renderInertia('auth/magic-link')
