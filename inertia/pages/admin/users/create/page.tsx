import { ReactNode } from 'react'
import AdminLayout from '../../layout'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Stack,
} from '@chakra-ui/react'
import FormInput from '@/components/form_input'
import { useForm } from '@inertiajs/react'
import FormSelect from '@/components/form_select'
import roles from '@/utils/roles'
import SEO from '@/components/seo'
import Roles from '~/app/shared/enums/roles'

function CreateUserPage() {
  const { data, setData, post, processing } = useForm({
    name: '',
    email: '',
    roleId: Roles.USER,
    verifiedEmail: false,
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
        <SEO title={`Criar usuário`} />
        <Heading size={{ base: 'xs', md: 'sm' }}>Criar usuário</Heading>

        <Stack
          spacing="5"
          as="form"
          onSubmit={(e) => {
            e.preventDefault()
            post(`/admin/usuarios/novo-usuario`)
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
            defaultChecked={data.verifiedEmail}
            onChange={(e) => setData('verifiedEmail', e.target.checked)}
          >
            E-mail verificado
          </Checkbox>

          <Alert status="info">
            <AlertIcon />A senha do usuário será "123456" e será obrigatório trocar após o primeiro
            login
          </Alert>

          <Button type="submit" isLoading={processing}>
            Criar
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

CreateUserPage.layout = (page: ReactNode) => <AdminLayout children={page} />

export default CreateUserPage
