import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'mailgun',

   /**
    * The mailers object can be used to configure multiple mailers
    * each using a different transport or same transport with different
    * options.
   */
  mailers: {   
    mailgun: transports.mailgun({
      key: env.get('MAILGUN_API_KEY'),
      baseUrl: 'https://api.mailgun.net/v3',
      domain: env.get('MAILGUN_DOMAIN'),
    }),
		   
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}