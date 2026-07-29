import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../siteConfig'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="nav" aria-label="メインナビゲーション">
        <a href="#hero" className="nav-logo" aria-label={`${BRAND_NAME} トップへ`}>
          <div className="nav-logo-mark" aria-hidden="true">🍊</div>
          <span className="nav-logo-text">{BRAND_NAME}</span>
        </a>

        <div className="nav-links">
          <a href="#hero" className="nav-link">ホーム</a>
          <a href="#about" className="nav-link">農園について</a>
          <a href="#products" className="nav-link">商品一覧</a>
          <a href="#philosophy" className="nav-link">私たちのこだわり</a>
          <a href="#faq" className="nav-link">お知らせ</a>
          <a href="#contact" className="nav-link">お問い合わせ</a>
        </div>

        <div className="nav-side">
          <Link to="/calendar" className="nav-link">みかん狩り予約</Link>
          <button type="button" className="nav-icon-btn" aria-label="カート(準備中)" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
          </button>
          <button type="button" className="nav-icon-btn" aria-label="マイページ(準備中)" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.4-3.6 4.4-5.6 7.5-5.6s6.1 2 7.5 5.6" /></svg>
          </button>
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
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <a href="#hero" onClick={() => setOpen(false)}>ホーム</a>
        <a href="#about" onClick={() => setOpen(false)}>農園について</a>
        <a href="#products" onClick={() => setOpen(false)}>商品一覧</a>
        <a href="#philosophy" onClick={() => setOpen(false)}>私たちのこだわり</a>
        <a href="#faq" onClick={() => setOpen(false)}>お知らせ</a>
        <a href="#contact" onClick={() => setOpen(false)}>お問い合わせ</a>
        <Link to="/calendar" onClick={() => setOpen(false)}>みかん狩り予約</Link>
      </div>
    </>
  )
}
