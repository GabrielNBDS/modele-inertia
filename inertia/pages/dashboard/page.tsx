import Header from '@/components/header'
import Toaster from '@/components/toaster'
import { Container } from '@chakra-ui/react'

function Dashboard() {
  Toaster()

  return (
    <>
      <Header />
      <Container maxW="3xl">Dashboard</Container>
    </>
  )
}

export default Dashboard
