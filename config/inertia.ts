import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    qs: (ctx) => ctx.request.qs(),
    params: (ctx) => ctx.request.params(),
    user: async (ctx) => {
      if (!ctx.auth.user) {
        return null
      }
      return ctx.auth.user.toJSON()
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
    pages: ['home'],
  },
})
