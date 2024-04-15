import { ReactNode } from 'react'
import AdminLayout from '../layout'

function AdminDashboardPage() {
  return <p>admin dashboard</p>
}

AdminDashboardPage.layout = (page: ReactNode) => <AdminLayout children={page} />

export default AdminDashboardPage
