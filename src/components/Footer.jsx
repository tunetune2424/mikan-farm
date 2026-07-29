const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || ''

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-en">Isa Mikan Farm</p>
            <p className="footer-brand-text">伊佐みかん園</p>
          </div>
          <p className="footer-desc">
            やんばるの大自然が育てた、沖縄の恵みを<br />あなたの食卓へ。
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
            <a href="#products">タンカン</a>
            <a href="#products">伊豆味柑</a>
            <a href="#products">シークヮーサー</a>
          </nav>

          <div className="footer-info">
            <p className="footer-col-label">伊佐みかん園</p>
            <p>沖縄県国頭郡今帰仁村字諸志</p>
            <p>info@isa-mikan.jp</p>
            <p>平日 9:00〜17:00</p>
            {LINE_ACCOUNT_URL && <a href={LINE_ACCOUNT_URL} className="footer-line-link">LINEで友だち追加</a>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} 伊佐みかん園. All rights reserved.</p>
          <p className="footer-bottom-en">Okinawa · Nakijin · Japan</p>
        </div>
      </div>
    </footer>
  )
}
