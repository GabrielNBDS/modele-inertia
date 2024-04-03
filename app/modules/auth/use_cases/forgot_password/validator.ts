import vine from '@vinejs/vine'

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .exists(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !!user
      }),
  })
)

export const forgotPasswordCodeValidator = vine.compile(
  vine.object({
    code: vine.string().nullable(),
    email: vine.string().email(),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    code: vine.string(),
    email: vine.string().email(),
    password: vine.string().nullable(),
  })
)
