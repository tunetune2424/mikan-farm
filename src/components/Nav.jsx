import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="メインナビゲーション">
        <a href="#hero" className="nav-logo" aria-label="伊佐みかん園 トップへ">
          <div className="nav-logo-mark" aria-hidden="true">🍊</div>
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
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <a href="#about" onClick={() => setOpen(false)}>農家紹介</a>
        <a href="#products" onClick={() => setOpen(false)}>商品</a>
        <a href="#philosophy" onClick={() => setOpen(false)}>こだわり</a>
        <a href="#contact" onClick={() => setOpen(false)}>お問い合わせ</a>
      </div>
    </>
  )
}
