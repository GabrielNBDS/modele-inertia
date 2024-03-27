import vine from '@vinejs/vine'

export const verifyEmailValidator = vine.compile(
  vine.object({
    code: vine.string(),
  })
)
