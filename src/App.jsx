import { Routes, Route } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CalendarPage from './pages/CalendarPage'
import ReservePage from './pages/ReservePage'

function HomePage() {
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

function App() {
  return (
    <PasswordGate>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/reserve" element={<ReservePage />} />
      </Routes>
    </PasswordGate>
  )
}

export default App
