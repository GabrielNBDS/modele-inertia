import Hero from './hero'
import Features from './features'
import Pricing from './pricing'
import Contact from './contact'
import Footer from './footer'
import Header from '@/components/header'
import SEO from '@/components/seo'

function Home() {
  return (
    <>
      <SEO title="Página inicial" />
      <Header />
      {/* <Hero />
      <Features />
      <Pricing />
      <Contact />
      <Footer /> */}
    </>
  )
}

export default Home
