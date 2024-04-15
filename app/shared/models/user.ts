import { DateTime, DurationLike } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Role from './role.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Code from './code.js'
import { v4 as uuidv4 } from 'uuid'
import CodeTypes from '../enums/code_types.js'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import Session from './session.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare verifiedEmail: boolean

  @column()
  declare roleId: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Code)
  declare codes: HasMany<typeof Code>

  @hasMany(() => Session)
  declare sessions: HasMany<typeof Session>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  async generateCode({
    type,
    expiration,
    metadata,
  }: {
    type: CodeTypes
    expiration?: DurationLike
    metadata?: any
  }) {
    await Code.query().where('userId', this.id).andWhere('type', type).delete()

    const code = await Code.create({
      userId: this.id,
      type,
      expiresAt: DateTime.now().plus(expiration ?? { minutes: 30 }),
      metadata,
    })

    return code
  }
}
