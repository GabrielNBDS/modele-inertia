import { ReactNode } from 'react'
import AdminLayout from '../layout'
import SEO from '@/components/seo'

function AdminDashboardPage() {
  return <p>admin dashboard</p>
}

AdminDashboardPage.layout = (page: ReactNode) => (
  <AdminLayout
    children={
      <>
        <SEO title="Dashboard" />
        {page}
      </>
    }
  />
)

export default AdminDashboardPage
