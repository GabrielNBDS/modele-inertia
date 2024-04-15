import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'
import CodeTypes from '../enums/code_types.js'

export default class Code extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(code: Code) {
    code.id = uuidv4()
  }

  @beforeCreate()
  static generateCode(model: Code) {
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10)
    }

    model.value = code
  }

  @column()
  declare value: string

  @column()
  declare type: CodeTypes

  @column()
  declare metadata: any

  @column.dateTime()
  declare expiresAt: DateTime

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  isExpired(): boolean {
    const now = DateTime.now()

    return now > this.expiresAt
  }
}
