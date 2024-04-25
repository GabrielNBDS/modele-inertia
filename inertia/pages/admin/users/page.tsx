import { ReactNode } from 'react'
import AdminLayout from '../layout'
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import AdminUsersController from '~/app/modules/admin/use_cases/users/controller'
import Pagination from '@/components/pagination'
import { Link, router } from '@inertiajs/react'
import SEO from '@/components/seo'
import { LuPlus } from 'react-icons/lu'

function UsersPage({ users }: InferPageProps<AdminUsersController, 'index'>) {
  return (
    <>
      <Button as={Link} href="/admin/usuarios/novo-usuario" rightIcon={<LuPlus />} mb={4} ml="auto">
        Criar usuário
      </Button>
      <TableContainer
        border="1px"
        borderColor="gray.100"
        _dark={{ borderColor: 'whiteAlpha.300' }}
        borderRadius="sm"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>E-mail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.data.map((user) => (
              <Tr
                cursor="pointer"
                _hover={{ bg: 'blackAlpha.100' }}
                _dark={{ _hover: { bg: 'whiteAlpha.100' } }}
                onClick={() => {
                  router.visit(`/admin/usuarios/${user.id}`)
                }}
              >
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination currentPage={users.meta.currentPage} lastPage={users.meta.lastPage} />
    </>
  )
}

UsersPage.layout = (page: ReactNode) => (
  <AdminLayout
    children={
      <>
        <SEO title="Visualizar usuários" />
        {page}
      </>
    }
  />
)

export default UsersPage
