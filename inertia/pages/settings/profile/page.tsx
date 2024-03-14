import ProfileForm from './profile_form'
import SettingsLayout from '../layout'

const SettingsProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">Gerencie os dados do seu perfil aqui.</p>
      </div>
      <ProfileForm />
    </div>
  )
}

SettingsProfilePage.layout = (page) => <SettingsLayout children={page} />

export default SettingsProfilePage
