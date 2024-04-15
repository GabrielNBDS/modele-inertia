import {
  Button,
  Icon,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import SettingsLayout from '../layout'

import type { InferPageProps } from '@adonisjs/inertia/types'
import type SessionsController from '../../../../app/modules/users/use_cases/sessions/controller'
import { DateTime } from 'luxon'
import { LuCheckCircle, LuLogOut, LuPower } from 'react-icons/lu'
import { Link } from '@inertiajs/react'

const SessionsPage = ({ sessions }: InferPageProps<SessionsController, 'view'>) => {
  return (
    <Stack spacing={6} w="full">
      <Text color="fg.muted">Gerencie suas sessões</Text>

      <TableContainer border={1}>
        <Table variant="simple">
          <TableCaption>Suas sessões</TableCaption>
          <Thead>
            <Tr>
              <Th>Dispositivo</Th>
              <Th>Endereço IP</Th>
              <Th>Última sessão</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sessions.map((session) => (
              <Tr>
                <Td>
                  {session.agent.browser.name} - {session.agent.os.name}
                </Td>
                <Td>{session.ipAddress}</Td>

                {session.isCurrentSession ? (
                  <Td display="flex" gap={2} alignItems="center">
                    Sessão atual <Icon boxSize={5} color="green" as={LuCheckCircle} />
                  </Td>
                ) : (
                  <Td display="flex" gap={2} alignItems="center">
                    {DateTime.fromISO(session.lastActiveAt!).setLocale('pt').toRelative()}{' '}
                    <Link href={`/configuracoes/sessoes/logout/${session.id}`} method="delete">
                      <Icon boxSize={5} color="red" as={LuPower} />
                    </Link>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button
        maxW="max-content"
        as={Link}
        href="/logout"
        method="post"
        mt="auto"
        justifyContent="flex-start"
        colorScheme="red"
        leftIcon={<LuLogOut />}
      >
        Sair da sessão atual
      </Button>
    </Stack>
  )
}

SessionsPage.layout = (page: ReactNode) => <SettingsLayout children={page} />

export default SessionsPage
