import Hero from './hero'
import Features from './features'
import Pricing from './pricing'
import Contact from './contact'
import Footer from './footer'
import Header from '@/components/header'
import Toaster from '@/components/toaster'

function Home() {
  Toaster()

  return (
    <>
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
