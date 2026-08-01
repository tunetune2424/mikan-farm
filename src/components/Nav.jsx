import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND_NAME, BRAND_NAME_EN, SHOP_ENABLED } from '../siteConfig'

const CART_COUNT = 1 // 見た目確認用のダミー値（実際のカート機能は未実装）

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="nav" aria-label="メインナビゲーション">
        <a href="#hero" className="nav-logo" aria-label={`${BRAND_NAME} トップへ`}>
          <div className="nav-logo-mark" aria-hidden="true">🍊</div>
          <span className="nav-logo-text-wrap">
            <span className="nav-logo-text">{BRAND_NAME}</span>
            <span className="nav-logo-text-en">{BRAND_NAME_EN.toUpperCase()}</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#hero" className="nav-link active">ホーム</a>
          <a href="#about" className="nav-link">農園について</a>
          {SHOP_ENABLED ? (
            <>
              <a href="#products" className="nav-link">商品一覧</a>
              <a href="#products" className="nav-link">みかんの種類</a>
              <a href="#news" className="nav-link">お知らせ</a>
              <a href="#contact" className="nav-link">ご利用ガイド</a>
            </>
          ) : (
            <>
              <a href="#instagram" className="nav-link">インスタグラム</a>
              <Link to="/calendar" className="nav-link">みかん狩り予約</Link>
              <a href="#contact" className="nav-link">お問い合わせ</a>
            </>
          )}
        </div>

        {SHOP_ENABLED && (
          <div className="nav-side">
            <button type="button" className="nav-icon-btn" aria-label="検索(準備中)" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            </button>
            <button type="button" className="nav-icon-btn" aria-label="ログイン(準備中)" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.4-3.6 4.4-5.6 7.5-5.6s6.1 2 7.5 5.6" /></svg>
            </button>
            <button type="button" className="nav-icon-btn" aria-label="お気に入り(準備中)" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-9.4-8.8C1 8 2.4 5 5.6 4.6c2-.3 3.7.8 4.9 2.6 1.2-1.8 3-2.9 4.9-2.6C18.6 5 20 8 20.4 11.2 22.9 15.6 12 20 12 20Z" /></svg>
            </button>
            <button type="button" className="nav-icon-btn nav-cart-btn" aria-label={`カート(${CART_COUNT}点・準備中)`} disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
              {CART_COUNT > 0 && <span className="nav-cart-badge">{CART_COUNT}</span>}
            </button>
          </div>
        )}

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
        {SHOP_ENABLED ? (
          <>
            <a href="#products" onClick={() => setOpen(false)}>商品一覧</a>
            <a href="#news" onClick={() => setOpen(false)}>お知らせ</a>
            <a href="#contact" onClick={() => setOpen(false)}>ご利用ガイド</a>
          </>
        ) : (
          <a href="#instagram" onClick={() => setOpen(false)}>インスタグラム</a>
        )}
        <Link to="/calendar" onClick={() => setOpen(false)}>みかん狩り予約</Link>
        {!SHOP_ENABLED && <a href="#contact" onClick={() => setOpen(false)}>お問い合わせ</a>}
      </div>
    </>
  )
}
