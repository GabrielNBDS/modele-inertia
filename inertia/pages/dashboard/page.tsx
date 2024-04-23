import SEO from '@/components/seo'
import Header from '@/components/header'
import { Container } from '@chakra-ui/react'

function Dashboard() {
  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <Container maxW="3xl">Dashboard</Container>
    </>
  )
}

export default Dashboard
