import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Products />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
