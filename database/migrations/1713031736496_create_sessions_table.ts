import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary().unique()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('session_token').unique()
      table.string('ip_address').notNullable()
      table.text('user_agent').notNullable()
      table.timestamp('last_active_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
