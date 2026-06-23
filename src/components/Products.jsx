import tankanImg from '../assets/tankan.jpeg'
import sekukwasaImg from '../assets/shikuwasa.jpg'
import izumiImg from '../assets/izumibeni.jpeg'
import wenzhouImg from '../assets/unsyuumikan.jpeg'

const tickerItems = ['タンカン', 'シークヮーサー', '伊豆味柑', '温州みかん']
const ticker = [...tickerItems, ...tickerItems, ...tickerItems]

export default function Products() {
  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products-header">
          <div className="fade-up">
            <p className="section-label">Products</p>
            <h2 className="section-title serif">旬の柑橘、<br />産地直送</h2>
          </div>
          <p className="fade-up" style={{ transitionDelay: '0.1s' }}>
            やんばるの恵みをそのまま食卓へ。収穫したその日に箱詰めして発送します。産地直送だから届く、採れたての甘みと香りをお楽しみください。
          </p>
        </div>
      </div>

      <div className="products-ticker" aria-hidden="true">
        <div className="products-ticker-inner">
          {ticker.map((name, i) => (
            <span key={i} className="products-ticker-item">{name} <span className="products-ticker-dot">·</span></span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="featured fade-up">
          <div className="featured-image">
            <img src={tankanImg} alt="タンカン" />
          </div>
          <div className="featured-info">
            <span className="featured-badge">人気 No.1</span>
            <h3 className="featured-name serif">タンカン</h3>
            <p className="featured-name-en">Tankan</p>
            <p className="featured-desc">
              やんばるの山々が生む大きな寒暖差が、果肉に糖度をぎゅっと凝縮させます。濃厚な甘みとあふれる果汁は、1〜2月のほんの短い季節にしか出会えない味。
            </p>
            <div className="featured-specs">
              <div>
                <p className="spec-label">SEASON</p>
                <p className="spec-value">1月〜2月</p>
              </div>
              <div>
                <p className="spec-label">ORIGIN</p>
                <p className="spec-value">沖縄県今帰仁村</p>
              </div>
            </div>
            <div className="product-price">
              <span className="price-num">3,200</span>
              <span className="price-unit">円〜 / 3kg</span>
            </div>
            <a href="#contact" className="btn-outline" style={{ color: 'var(--text)', borderColor: 'var(--line)' }}>
              ご注文はこちら <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="product-grid">
          <div className="product-card fade-up">
            <div className="product-card-image">
              <img src={sekukwasaImg} alt="シークヮーサー" />
              <span className="product-card-tag">沖縄の恵み</span>
            </div>
            <div className="product-card-body">
              <h3 className="product-card-name serif">シークヮーサー</h3>
              <p className="product-card-desc">キリッとした酸味と爽やかな香りは沖縄料理に欠かせない存在。ドリンクや調味料としても幅広く活躍します。</p>
              <div className="product-card-footer">
                <p className="product-price-sm">1,800円〜 / 1kg</p>
                <span className="product-card-link">詳しく →</span>
              </div>
            </div>
          </div>

          <div className="product-card fade-up" style={{ transitionDelay: '0.1s' }}>
            <div className="product-card-image">
              <img src={izumiImg} alt="伊豆味柑" />
              <span className="product-card-tag">数量限定</span>
            </div>
            <div className="product-card-body">
              <h3 className="product-card-name serif">伊豆味柑</h3>
              <p className="product-card-desc">伊豆味の地に根ざした在来品種。甘みの中にほどよい酸味が溶け込み、食べるほどに深みが増す希少な一品。</p>
              <div className="product-card-footer">
                <p className="product-price-sm">2,500円〜 / 2kg</p>
                <span className="product-card-link">詳しく →</span>
              </div>
            </div>
          </div>

          <div className="product-card fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="product-card-image">
              <img src={wenzhouImg} alt="温州みかん" />
              <span className="product-card-tag">贈答用</span>
            </div>
            <div className="product-card-body">
              <h3 className="product-card-name serif">温州みかん</h3>
              <p className="product-card-desc">沖縄の温暖な日差しをたっぷり浴びて育った、やさしい甘みのみかん。大切な方への贈り物にも。</p>
              <div className="product-card-footer">
                <p className="product-price-sm">2,800円〜 / 5kg</p>
                <span className="product-card-link">詳しく →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
