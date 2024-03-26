import { Toaster } from '@/components/toaster'

interface DashboardLayoutProps {
  children: JSX.Element
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
