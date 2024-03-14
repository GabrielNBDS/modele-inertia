import type { User } from '@/types/user'
import usePageProps from './use_page_props'

export default function useUser() {
  const { user } = usePageProps<{
    user?: User
  }>()

  if (!user) return null

  return {
    name: user?.name,
    email: user?.email,
    isAdmin: user?.roleId === 1,
  }
}
