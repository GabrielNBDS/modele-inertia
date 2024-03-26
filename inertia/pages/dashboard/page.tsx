import Header from '@/components/header'
import DashboardLayout from './layout'

function Dashboard() {
  return (
    <>
      <Header />
      <div className="container mx-auto xl:max-w-5xl">Dashboard</div>
    </>
  )
}

Dashboard.layout = (page: JSX.Element) => <DashboardLayout children={page} />

export default Dashboard
