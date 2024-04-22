import Toaster from '@/components/toaster'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  Toaster()

  return <>{children}</>
}
