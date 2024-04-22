import vine from '@vinejs/vine'
import Roles from '../../../../shared/enums/roles.js'

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    roleId: vine.enum(Roles),
    verifiedEmail: vine.boolean(),
  })
)
