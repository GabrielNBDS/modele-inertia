import vine from '@vinejs/vine'

export const redefinePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(8),
  })
)
