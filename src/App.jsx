import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Registration from './components/Registration.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <Registration />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
