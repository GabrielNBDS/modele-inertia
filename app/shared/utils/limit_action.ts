import limiter from '@adonisjs/limiter/services/main'
import { Session } from '@adonisjs/session'
import { Duration } from 'luxon'

interface LimiterProps {
  requests: number
  duration: string | number
  key: string
  session: Session
  blockDuration?: string | number | undefined
}

export default async function limitAction({
  duration,
  requests,
  blockDuration,
  key,
  session,
}: LimiterProps) {
  const limit = limiter.use({
    requests,
    duration,
    blockDuration,
  })

  const remainingTime = Duration.fromObject({
    seconds: await limit.availableIn(key),
  })

  const minutes = Math.floor(remainingTime.as('minutes'))
  const seconds = remainingTime.minus({ minutes: minutes }).as('seconds')

  if ((await limit.remaining(key)) < 1) {
    session.flash('notifications', [
      {
        type: 'error',
        message: `Muitas tentativas. Espere ${minutes} minutos e ${Math.round(seconds)} antes de tentar novamente.`,
        duration: 10000,
      },
    ])
    return true
  }

  await limit.increment(key)
  return false
}
