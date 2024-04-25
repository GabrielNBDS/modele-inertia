import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const RedefinePasswordController = () => import('./use_cases/redefine_password/controller.js')
const SessionsController = () => import('./use_cases/sessions/controller.js')
const UpdateUserController = () => import('./use_cases/update_user/controller.js')
const VerifyEmailController = () => import('./use_cases/verify_email/controller.js')
const ChangePasswordController = () => import('./use_cases/change_password/controller.js')

router
  .group(() => {
    router.get('/perfil', [UpdateUserController, 'view'])
    router.post('/perfil', [UpdateUserController, 'handle'])

    router.post('/atualizar-email', [UpdateUserController, 'handleEmailUpdate'])
    router.get('/verificar-email', [VerifyEmailController, 'view'])
    router.post('/verificar-email', [VerifyEmailController, 'handle'])
    router.post('/verificar-email/reenviar', [VerifyEmailController, 'resend'])

    router.get('/redefinir-senha', [RedefinePasswordController, 'view'])
    router.post('/redefinir-senha', [RedefinePasswordController, 'handle'])

    router.get('/seguranca', [ChangePasswordController, 'view'])
    router.post('/seguranca', [ChangePasswordController, 'handle'])

    router.get('/sessoes', [SessionsController, 'view'])
    router.delete('/sessoes/logout/:id', [SessionsController, 'delete'])
  })
  .prefix('/configuracoes')
  .use(middleware.auth())
