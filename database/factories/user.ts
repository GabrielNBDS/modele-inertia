import Factory from '@adonisjs/lucid/factories'
import User from '../../app/shared/models/user.js'

export const UserFactory = Factory.define(User, ({ faker }) => {
  const name = faker.person.firstName()
  return {
    name,
    email: faker.internet.email({ firstName: name }),
    password: '123123123',
  }
}).build()
