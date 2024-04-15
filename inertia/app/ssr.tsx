/// <reference path="../../adonisrc.ts" />
import '../css/app.css'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/page.tsx', { eager: true })
      return pages[`../pages/${name}/page.tsx`]
    },
    setup: ({ App, props }) => (
      <ChakraProvider theme={theme}>
        <App {...props} />
      </ChakraProvider>
    ),
  })
}
