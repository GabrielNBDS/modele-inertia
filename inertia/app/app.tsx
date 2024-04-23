/// <reference path="../../adonisrc.ts" />
import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import AppLayout from './layout'

createInertiaApp({
  progress: { color: 'var(--chakra-colors-accent)' },

  resolve: async (name) => {
    const page: any = await resolvePageComponent(
      `../pages/${name}/page.tsx`,
      import.meta.glob('../pages/**/page.tsx')
    )

    page.default.layout ??= (p: any) => <AppLayout children={p} />
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <>
        <ChakraProvider theme={theme}>
          <App {...props} />
        </ChakraProvider>
      </>
    )
  },
})
