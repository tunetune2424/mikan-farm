import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Strengths from './components/Strengths'
import Products from './components/Products'
import ScheduleGift from './components/ScheduleGift'
import AppBenefits from './components/AppBenefits'
import News from './components/News'
import InstagramFeed from './components/InstagramFeed'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CalendarPage from './pages/CalendarPage'
import ReservePage from './pages/ReservePage'
import { useScrollAnimation } from './hooks/useScrollAnimation'

function HomePage() {
  useScrollAnimation()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Strengths />
        <Products />
        <ScheduleGift />
        <AppBenefits />
        <News />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/reserve" element={<ReservePage />} />
    </Routes>
  )
}

export default App
