import { ReactNode } from 'react'
import { InferPageProps } from '@adonisjs/inertia/types'
import AdminUsersController from '~/app/modules/admin/use_cases/users/controller'
import AdminLayout from '../../layout'
import { Box, Button, Checkbox, Container, Heading, Stack } from '@chakra-ui/react'
import FormInput from '@/components/form_input'
import { useForm } from '@inertiajs/react'
import FormSelect from '@/components/form_select'
import roles from '@/utils/roles'
import SEO from '@/components/seo'

function ReadUserPage({ user }: InferPageProps<AdminUsersController, 'read'>) {
  const { data, setData, put, processing } = useForm({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    verifiedEmail: user.verifiedEmail,
  })

  return (
    <Box
      py={{ base: '0', sm: '8' }}
      px={{ base: '4', sm: '10' }}
      bg={{ base: 'transparent', sm: 'bg.surface' }}
      boxShadow={{ base: 'none', sm: 'md' }}
      borderRadius={{ base: 'none', sm: 'xl' }}
    >
      <Container maxW="2xl">
        <SEO title={`Editar "${user.name}"`} />
        <Heading mb={6} size={{ base: 'xs', md: 'sm' }}>
          Editar "{user.name}"
        </Heading>

        <Stack
          spacing="5"
          as="form"
          onSubmit={(e) => {
            e.preventDefault()
            put(`/admin/usuarios/${user.id}/editar`)
          }}
        >
          <FormInput
            label="Nome"
            id="name"
            type="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />

          <FormInput
            label="E-mail"
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />

          <FormSelect
            label="Papel"
            value={data.roleId}
            onChange={(e) => setData('roleId', Number(e.target.value))}
          >
            {roles.map((role) => (
              <option value={role.value}>{role.label}</option>
            ))}
          </FormSelect>

          <Checkbox
            defaultChecked={user.verifiedEmail}
            onChange={(e) => setData('verifiedEmail', e.target.checked)}
          >
            E-mail verificado
          </Checkbox>

          <Button type="submit" isLoading={processing}>
            Editar
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

ReadUserPage.layout = (page: ReactNode) => <AdminLayout children={page} />

export default ReadUserPage
