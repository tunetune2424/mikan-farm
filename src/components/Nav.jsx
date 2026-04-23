import { useState, useEffect } from 'react'   // ① importが必要

export default function Nav() {               // ② 関数でくるむ
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {                           // ③ useEffectでくるむ
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (                                    // ④ returnの中にJSX
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">
          <div className="nav-logo-mark">🍊</div>
          <span className="nav-logo-text">伊佐みかん園</span>
        </a>

        <div className="nav-links">
          <a href="#about" className="nav-link">農家紹介</a>
          <a href="#products" className="nav-link">商品</a>
          <a href="#philosophy" className="nav-link">こだわり</a>
          <a href="#contact" className="nav-link">お問い合わせ</a>
        </div>

        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <a href="#about" onClick={() => setOpen(false)}>農家紹介</a>
        <a href="#products" onClick={() => setOpen(false)}>商品</a>
        <a href="#philosophy" onClick={() => setOpen(false)}>こだわり</a>
        <a href="#contact" onClick={() => setOpen(false)}>お問い合わせ</a>
      </div>
    </>
  )
}
