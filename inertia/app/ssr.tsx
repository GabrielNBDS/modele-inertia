import '../css/app.css'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/page.tsx', { eager: true })
      return pages[`../pages/${name}/page.tsx`]
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
