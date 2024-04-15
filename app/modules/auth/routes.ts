import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LogoutController = () => import('./use_cases/logout/controller.js')
const ForgotPasswordController = () => import('./use_cases/forgot_password/controller.js')
const LoginController = () => import('./use_cases/login/controller.js')
const RegisterController = () => import('./use_cases/register/controller.js')

router.get('/entrar', [LoginController, 'view']).middleware(middleware.guest())
router.post('/login', [LoginController, 'handle'])

router.post('logout', [LogoutController, 'handle']).use(middleware.auth())

router.get('/cadastrar', [RegisterController, 'view']).middleware(middleware.guest())
router.post('/register', [RegisterController, 'handle']).middleware(middleware.guest())

router
  .get('/esqueci-minha-senha', [ForgotPasswordController, 'view'])
  .middleware(middleware.guest())
router.post('/esqueci-minha-senha', [ForgotPasswordController, 'sendEmail'])
router.post('/esqueci-minha-senha/codigo', [ForgotPasswordController, 'handle'])
router.post('/esqueci-minha-senha/trocar-senha', [ForgotPasswordController, 'changePassword'])

router.on('/email-link').renderInertia('auth/magic-link')
