export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <span>🍊</span>
            <span className="footer-brand-text">伊佐みかん園</span>
          </div>
          <p className="footer-tag">Isa Mikan Farm</p>
          <p className="footer-desc">やんばるの大自然が育てた、沖縄の恵みをあなたの食卓へ。</p>
        </div>

        <div className="footer-col">
          <h4>Menu</h4>
          <ul>
            <li><a href="#about">農家紹介</a></li>
            <li><a href="#products">商品</a></li>
            <li><a href="#philosophy">こだわり</a></li>
            <li><a href="#contact">お問い合わせ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li>沖縄県国頭郡本部町伊豆味</li>
            <li>info@isa-mikan.jp</li>
            <li>9:00〜17:00</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Season</h4>
          <ul>
            <li>タンカン：1〜2月</li>
            <li>シークヮーサー：8〜12月</li>
            <li>温州みかん：11〜1月</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} 伊佐みかん園. All rights reserved.</p>
      </div>
    </footer>
  )
}
