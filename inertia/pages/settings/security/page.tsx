import SettingsLayout from '../layout'
import ChangePasswordForm from './change_password_form'

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Segurança</h3>
        <p className="text-sm text-muted-foreground">Gerencie suas configurações de acesso aqui.</p>
      </div>
      <ChangePasswordForm />
    </div>
  )
}

SettingsProfilePage.layout = (page) => <SettingsLayout children={page} />

export default SettingsProfilePage
