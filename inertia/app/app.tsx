import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}/page.tsx`,
      import.meta.glob('../pages/**/page.tsx')
    )
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <>
        <App {...props} />
      </>
    )
  },
})
