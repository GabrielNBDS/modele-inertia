import useFlash from '@/hooks/use_flash'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function Toaster() {
  const toast = useToast()
  const flash = useFlash<{
    notifications?: { type: 'success' | 'error' | 'info' | 'warning'; message: string }[]
  }>()

  useEffect(() => {
    flash?.notifications?.forEach(({ message, type }) => {
      toast({
        title: message,
        status: type,
        isClosable: true,
        duration: 3000,
      })
    })
  }, [flash?.notifications])
}
