import { ReactNode } from 'react'
import { InferPageProps } from '@adonisjs/inertia/types'
import AdminUsersController from '~/app/modules/admin/use_cases/users/controller'
import AdminLayout from '../../layout'
import {
  Badge,
  Box,
  Checkbox,
  Container,
  HStack,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link } from '@inertiajs/react'
import { LuPenLine } from 'react-icons/lu'
import roles from '@/utils/roles'

function ReadUserPage({ user }: InferPageProps<AdminUsersController, 'read'>) {
  return (
    <Box
      py={{ base: '0', sm: '8' }}
      px={{ base: '4', sm: '10' }}
      bg={{ base: 'transparent', sm: 'bg.surface' }}
      boxShadow={{ base: 'none', sm: 'md' }}
      borderRadius={{ base: 'none', sm: 'xl' }}
    >
      <Container maxW="2xl">
        <Stack>
          <HStack justify="space-between">
            <HStack>
              <Heading size={{ base: 'xs', md: 'sm' }}>{user.name}</Heading>
              <Badge>{roles.find((e) => e.value === user.roleId)?.label}</Badge>
            </HStack>
            <IconButton
              aria-label="editar"
              variant="link"
              as={Link}
              icon={<LuPenLine />}
              href={`/admin/usuarios/${user.id}/editar`}
            />
          </HStack>

          <Text color="fg.muted">{user.email}</Text>
          <Checkbox defaultChecked={user.verifiedEmail} disabled>
            E-mail verificado
          </Checkbox>
        </Stack>
      </Container>
    </Box>
  )
}

ReadUserPage.layout = (page: ReactNode) => <AdminLayout children={page} />

export default ReadUserPage
