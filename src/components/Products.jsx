import tankanImg from '../assets/たんかん.jpeg'
import shikuwasaImg from '../assets/img-shikuwasa.svg'
import izumikanImg from '../assets/img-izumikan.svg'
import unshuImg from '../assets/img-unshu.svg'

export default function Products() {
  return (
    <section id="products" className="products">
      <div className="products-header">
        <p className="section-label">Products</p>
        <h2 className="section-title serif">旬の柑橘、<br />産地直送</h2>
      </div>

      <div className="featured">
        <div className="featured-image">
          <img src={tankanImg} alt="タンカン" />
        </div>
        <div className="featured-info">
          <span className="featured-badge">人気No.1</span>
          <h3 className="featured-name serif">タンカン</h3>
          <p className="featured-desc">やんばるの山々が生む大きな寒暖差が、果肉に糖度をぎゅっと凝縮させます。濃厚な甘みとあふれる果汁は、1〜2月のほんの短い季節にしか出会えない味。畑から食卓まで、最短でお届けします。</p>
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
            <img src={shikuwasaImg} alt="シークヮーサー" />
          </div>
          <div className="product-card-body">
            <span className="product-tag">沖縄の恵み</span>
            <h3 className="product-card-name">シークヮーサー</h3>
            <p className="product-card-desc">キリッとした酸味と爽やかな香りは沖縄料理に欠かせない存在。搾りたては格別で、ドリンクや調味料としても幅広く活躍します。</p>
            <span className="product-price-sm">1,800円〜 / 1kg</span>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image">
            <img src={izumikanImg} alt="伊豆味柑" />
          </div>
          <div className="product-card-body">
            <span className="product-tag">数量限定</span>
            <h3 className="product-card-name">伊豆味柑</h3>
            <p className="product-card-desc">伊豆味の地に根ざした在来品種。甘みの中にほどよい酸味が溶け込み、食べるほどに深みが増す。地元でしか知られていない、希少な一品です。</p>
            <span className="product-price-sm">2,500円〜 / 2kg</span>
          </div>
        </div>

        <div className="product-card">
          <div className="product-card-image">
            <img src={unshuImg} alt="温州みかん" />
          </div>
          <div className="product-card-body">
            <span className="product-tag">贈答用</span>
            <h3 className="product-card-name">温州みかん</h3>
            <p className="product-card-desc">沖縄の温暖な日差しをたっぷり浴びて育った、やさしい甘みのみかん。子どもからお年寄りまで喜ばれる定番の味で、大切な方への贈り物にも。</p>
            <span className="product-price-sm">2,800円〜 / 5kg</span>
          </div>
        </div>
      </div>
    </section>
  )
}
