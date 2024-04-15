import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare ipAddress: string

  @column()
  declare sessionToken: string

  @column()
  declare userAgent: string

  @column.dateTime({ autoCreate: true })
  declare lastActiveAt: DateTime
}
