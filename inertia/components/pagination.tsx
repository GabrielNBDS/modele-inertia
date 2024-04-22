import { Button, HStack, IconButton } from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import { usePagination } from '@mantine/hooks'
import { FiMoreHorizontal } from 'react-icons/fi'

interface PaginationProps {
  lastPage: number
  currentPage: number
}

export default function Pagination({ currentPage, lastPage }: PaginationProps) {
  const pagination = usePagination({
    total: lastPage,
    initialPage: currentPage,
  })

  return (
    <HStack mt={4}>
      {pagination.range.map((page) => {
        if (page === 'dots') {
          return (
            <IconButton
              size="xs"
              aria-label=""
              colorScheme="gray"
              variant="outline"
              icon={<FiMoreHorizontal />}
            />
          )
        }

        const active = pagination.active === page

        return (
          <Button
            as={Link}
            variant={active ? 'solid' : 'outline'}
            colorScheme={active ? 'brand' : 'gray'}
            size="xs"
            href={`${window.location.pathname}?page=${page}`}
          >
            {page}
          </Button>
        )
      })}
    </HStack>
  )
}
