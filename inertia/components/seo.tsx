import { Head } from '@inertiajs/react'
import React from 'react'
import modele from '~/config/modele'

interface SEOProps {
  title: string
  description?: string
  image?: string
  ogWidth?: string
  ogHeight?: string
  shouldExcludeTitleSuffix?: boolean
  shouldIndexPage?: boolean
}

const appName = import.meta.env.VITE_APP_NAME || modele.appName

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  ogHeight,
  ogWidth,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = false,
}) => {
  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? `| ${appName}` : ''}`

  const pageImage =
    image ||
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQKM27r4mGTtmwAx8DP1a585XJ07UbQTMRm7yaOGP8w&s'

  return (
    <Head>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={ogWidth || '195px'} />
      <meta property="og:image:height" content={ogHeight || '44px'} />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:src" content={pageImage} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content={ogWidth || '195px'} />
      <meta name="twitter:image:height" content={ogHeight || '44px'} />

      {!shouldIndexPage && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  )
}

export default SEO
