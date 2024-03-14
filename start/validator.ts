import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'Campo obrigatório',
  'email': 'Formato inválido',
  'minLength': 'Mínimo de {{ min }} caracteres',
  'email.database.unique': 'Este e-mail já está em uso',
})
