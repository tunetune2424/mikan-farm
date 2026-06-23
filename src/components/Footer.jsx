export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-en">Yanbaru Mikan Farm</p>
            <p className="footer-brand-text">山原みかん農園</p>
          </div>
          <p className="footer-desc">
            やんばるの大自然が育てた、沖縄の恵みを<br />あなたの食卓へ。
          </p>
        </div>

        <div className="footer-body">
          <nav className="footer-nav">
            <a href="#about">農家紹介</a>
            <a href="#products">商品</a>
            <a href="#philosophy">こだわり</a>
            <a href="#contact">お問い合わせ</a>
          </nav>
          <div className="footer-info">
            <p>沖縄県国頭郡今帰仁村字諸志</p>
            <p>info@isa-mikan.jp</p>
            <p>平日 9:00〜17:00</p>
          </div>
          <div className="footer-season">
            <p className="footer-season-label">収穫カレンダー</p>
            <p>タンカン：1〜2月</p>
            <p>シークヮーサー：8〜12月</p>
            <p>温州みかん：11〜1月</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} 山原みかん農園. All rights reserved.</p>
          <p className="footer-bottom-en">Okinawa · Nakijin · Japan</p>
        </div>
      </div>
    </footer>
  )
}
