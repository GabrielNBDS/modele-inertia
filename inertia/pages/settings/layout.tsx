import Header from '@/components/header'
import Toaster from '@/components/toaster'
import { Container, Stack } from '@chakra-ui/react'
import { SidebarNav } from './sidebar_nav'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  Toaster()

  return (
    <>
      <Header />

      <Container maxW="4xl" py={8} px={{ base: '0', sm: '8' }}>
        <Stack
          py={{ base: '0', md: '8' }}
          px={{ base: '4', md: '10' }}
          bg={{ base: 'transparent', md: 'bg.surface' }}
          boxShadow={{ base: 'none', md: 'md' }}
          borderRadius={{ base: 'none', md: 'xl' }}
          gap={8}
          w="full"
          alignItems="start"
          direction={{ base: 'column', md: 'row' }}
        >
          <SidebarNav />
          {children}
        </Stack>
      </Container>
    </>
  )
}
