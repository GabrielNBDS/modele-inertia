import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/shared/enums/roles.js'
import { Hash } from '@adonisjs/core/hash'
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'
import { v4 as uuidv4 } from 'uuid'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').nullable()
      table.string('email', 254).unique()
      table.string('password')
      table.boolean('verified_email').defaultTo(false)

      table.integer('role_id').unsigned().references('id').inTable('roles')

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })

    const hash = new Hash(new Scrypt({}))
    const hashedPassword = await hash.make('admin')

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: uuidv4(),
        name: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role_id: Roles.ADMIN,
        created_at: new Date(),
        verified_email: true,
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
