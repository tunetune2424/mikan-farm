import { useState } from 'react'
import { BRAND_NAME, BRAND_NAME_EN, SHOP_ENABLED } from '../siteConfig'

const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || ''

// SNSアカウントが決まったらリンクをここに設定してください（未設定の間はクリックできません）
const SOCIAL_LINKS = {
  instagram: '',
  line: LINE_ACCOUNT_URL,
  facebook: '',
}

function SocialIcon({ type }) {
  const icons = {
    instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>,
    line: <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C8.82 3 3 7.92 3 14c0 5.07 4.35 9.35 10.35 10.7l.65.14v3.64l3.58-2.69.46-.04C24.93 25 29 20.27 29 14 29 7.92 23.18 3 16 3z" /></svg>,
    facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3H13.5V8.3c0-.87.24-1.46 1.5-1.46H16.6V4.14C16.3 4.1 15.3 4 14.1 4c-2.4 0-4.1 1.47-4.1 4.17V10.5H7.5v3H10V21z" /></svg>,
  }
  return icons[type]
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    // メール配信の仕組みは未実装のため、見た目のみの確認用フィードバックです。
    setSubscribed(true)
  }

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-en">{BRAND_NAME_EN.toUpperCase()}</p>
            <p className="footer-brand-text">{BRAND_NAME}</p>
          </div>
          <p className="footer-desc">
            {SHOP_ENABLED
              ? <>三代続くみかん農園から、旬の美味しさを<br />産地直送でお届けします。</>
              : <>三代続くみかん農園が、<br />丹精込めてみかんを育てています。</>}
          </p>
        </div>

        <div className={`footer-body ${SHOP_ENABLED ? 'footer-body-5' : 'footer-body-3'}`}>
          <nav className="footer-nav">
            <p className="footer-col-label">メニュー</p>
            <a href="#hero">ホーム</a>
            <a href="#about">農園について</a>
            {SHOP_ENABLED ? (
              <>
                <a href="#products">商品一覧</a>
                <a href="#products">みかんの種類</a>
                <a href="#news">お知らせ</a>
              </>
            ) : (
              <a href="#instagram">インスタグラム</a>
            )}
          </nav>

          {SHOP_ENABLED && (
            <nav className="footer-nav">
              <p className="footer-col-label">商品一覧</p>
              <a href="#products">温州みかん</a>
              <a href="#products">せとか</a>
              <a href="#products">不知火（しらぬい）</a>
              <a href="#products">レモン</a>
            </nav>
          )}

          <nav className="footer-nav">
            <p className="footer-col-label">サポート</p>
            <a href="#contact">よくあるご質問</a>
            <a href="#contact">お問い合わせ</a>
            <a href="/calendar">みかん狩り予約</a>
          </nav>

          {SHOP_ENABLED && (
            <nav className="footer-nav">
              <p className="footer-col-label">ご利用ガイド</p>
              <a href="#contact">お支払い方法</a>
              <a href="#contact">ギフトについて</a>
              <a href="#contact">送料・配送について</a>
              <a href="#contact">特定商取引法に基づく表記</a>
            </nav>
          )}

          <div className="footer-newsletter">
            <p className="footer-col-label">お得な情報をお届けします</p>
            {subscribed ? (
              <p className="footer-newsletter-done">登録ありがとうございます！</p>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="メールアドレスを入力"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">登録する</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            {Object.entries(SOCIAL_LINKS).map(([type, url]) => (
              url ? (
                <a key={type} href={url} className="footer-social-icon" aria-label={type}><SocialIcon type={type} /></a>
              ) : (
                <span key={type} className="footer-social-icon disabled" aria-hidden="true" title="URL未設定"><SocialIcon type={type} /></span>
              )
            ))}
          </div>
          <p>© {new Date().getFullYear()} {BRAND_NAME_EN}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
