import { BRAND_NAME, BRAND_NAME_EN, ADDRESS, POSTAL_CODE, PHONE, EMAIL, HOURS } from '../siteConfig'

const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || ''

// SNSアカウントが決まったらリンクをここに設定してください（未設定の間はクリックできません）
const SOCIAL_LINKS = {
  instagram: '',
  facebook: '',
  x: '',
}

function SocialIcon({ type }) {
  const icons = {
    instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>,
    facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3H13.5V8.3c0-.87.24-1.46 1.5-1.46H16.6V4.14C16.3 4.1 15.3 4 14.1 4c-2.4 0-4.1 1.47-4.1 4.17V10.5H7.5v3H10V21z" /></svg>,
    x: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l7 9.2L4.3 20h1.9l5.8-5.9L16.5 20H20l-7.3-9.6L19.6 4h-1.9l-5.4 5.5L8.5 4z" /></svg>,
  }
  return icons[type]
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-en">{BRAND_NAME_EN}</p>
            <p className="footer-brand-text">{BRAND_NAME}</p>
          </div>
          <p className="footer-desc">
            山の恵みが育てた、旬のみかんを<br />あなたの食卓へ。
          </p>
        </div>

        <div className="footer-body">
          <nav className="footer-nav">
            <p className="footer-col-label">メニュー</p>
            <a href="#hero">ホーム</a>
            <a href="#about">農園について</a>
            <a href="#products">商品一覧</a>
            <a href="#philosophy">私たちのこだわり</a>
            <a href="#faq">お知らせ</a>
            <a href="#contact">お問い合わせ</a>
          </nav>

          <nav className="footer-nav">
            <p className="footer-col-label">商品一覧</p>
            <a href="#products">温州みかん</a>
            <a href="#products">せとか</a>
            <a href="#products">不知火</a>
          </nav>

          <nav className="footer-nav">
            <p className="footer-col-label">サポート</p>
            <a href="#faq">よくあるご質問</a>
            <a href="#contact">お問い合わせ</a>
            {LINE_ACCOUNT_URL && <a href={LINE_ACCOUNT_URL}>LINEで友だち追加</a>}
          </nav>

          <div className="footer-info">
            <p className="footer-col-label">{BRAND_NAME}</p>
            <p>{POSTAL_CODE} {ADDRESS}</p>
            <p>{EMAIL}</p>
            <p>TEL: {PHONE}</p>
            <p>{HOURS}</p>
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
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
