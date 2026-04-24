export default function Products() {
  return (
    <section id="products" className="products">
      <div className="products-header">
        <p className="section-label">Products</p>
        <h2 className="section-title serif">旬の柑橘、<br />産地直送</h2>
      </div>

      <div className="featured">
        <div className="featured-image">
          <div className="ph ph-orange" style={{ width: '100%', height: '100%' }}>
            <span className="ph-label">タンカン</span>
          </div>
        </div>
        <div className="featured-info">
          <span className="featured-badge">人気No.1</span>
          <h3 className="featured-name serif">タンカン</h3>
          <p className="featured-desc">やんばるの寒暖差で育った沖縄を代表する柑橘。濃厚な甘みとジューシーな果汁が特徴で、1〜2月の限られた時期にしか味わえません。</p>
          <div className="product-price">
            <span className="price-num">3,200</span>
            <span className="price-unit">円〜 / 3kg</span>
          </div>
          <a href="#contact" className="btn-outline" style={{ color: 'var(--text)', borderColor: 'var(--text)' }}>
            ご注文はこちら <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <div className="product-grid">
        <div className="product-card">
          <div className="product-card-image">
            <div className="ph ph-green" style={{ width: '100%', height: '100%' }}>
              <span className="ph-label">シークヮーサー</span>
            </div>
          </div>
          <div className="product-card-body">
            <span className="product-tag">沖縄の恵み</span>
            <h3 className="product-card-name">シークヮーサー</h3>
            <p className="product-card-desc">沖縄の伝統的な柑橘。爽やかな酸味と豊かな香りで、料理・ドリンクに幅広く活躍します。</p>
            <span className="product-price-sm">1,800円〜 / 1kg</span>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image">
            <div className="ph ph-dusk" style={{ width: '100%', height: '100%' }}>
              <span className="ph-label">伊豆味柑</span>
            </div>
          </div>
          <div className="product-card-body">
            <span className="product-tag">数量限定</span>
            <h3 className="product-card-name">伊豆味柑</h3>
            <p className="product-card-desc">伊豆味地区で古くから育てられてきた在来品種。甘みと酸味のバランスが絶妙で、地元で愛され続けています。</p>
            <span className="product-price-sm">2,500円〜 / 2kg</span>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image">
            <div className="ph ph-warm" style={{ width: '100%', height: '100%' }}>
              <span className="ph-label">温州みかん</span>
            </div>
          </div>
          <div className="product-card-body">
            <span className="product-tag">贈答用</span>
            <h3 className="product-card-name">温州みかん</h3>
            <p className="product-card-desc">沖縄の温暖な気候で育てた温州みかん。やさしい甘みで老若男女に喜ばれる、贈り物にも最適な一品です。</p>
            <span className="product-price-sm">2,800円〜 / 5kg</span>
          </div>
        </div>
      </div>
    </section>
  )
}
