import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/shared/enums/roles.js'
import { Hash } from '@adonisjs/core/hash'
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.boolean('verified_email').defaultTo(false)
      table.string('desired_email').nullable()
      table.string('code')

      table.integer('role_id').unsigned().references('id').inTable('roles')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    const hash = new Hash(new Scrypt({}))
    const hashedPassword = await hash.make('admin')

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
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
