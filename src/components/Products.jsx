import wenzhouImg from '../assets/unsyuumikan.jpeg'
// せとか・不知火の実物写真がまだ無いため、近い色味の既存写真を仮置きしています。
// 実際の写真が用意でき次第、下記の import を差し替えてください。
import setokaPlaceholder from '../assets/tankan.jpeg'
import shiranuiPlaceholder from '../assets/izumibeni.jpeg'

const products = [
  {
    img: wenzhouImg,
    name: '温州みかん',
    desc: '甘みと酸味のバランスが良い定番のみかん。',
    price: '2,800',
  },
  {
    img: setokaPlaceholder,
    name: 'せとか',
    desc: 'とろける食感と濃厚な甘みが特徴の高糖度種。',
    price: '3,800',
    isPlaceholderImage: true,
  },
  {
    img: shiranuiPlaceholder,
    name: '不知火（しらぬい）',
    desc: '濃厚な甘みとジューシーさが人気の品種。',
    price: '3,200',
    isPlaceholderImage: true,
  },
]

export default function Products() {
  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products-head fade-up">
          <p className="section-label center">Product</p>
          <h2 className="section-title serif center">旬のみかん</h2>
        </div>

        <div className="product-grid product-grid-3">
          {products.map((p, i) => (
            <div key={p.name} className="product-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="product-card-image">
                <img src={p.img} alt={p.name} />
                {p.isPlaceholderImage && <span className="product-card-placeholder-tag">写真は仮画像</span>}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name serif">{p.name}</h3>
                <p className="product-card-desc">{p.desc}</p>
                <div className="product-card-footer">
                  <span className="price-num">¥{p.price}<span className="price-unit">（税込）〜</span></span>
                  <a href="#contact" className="btn-fill product-card-btn">
                    商品を見る <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="products-cta fade-up">
          <a href="#contact" className="btn-line">
            すべての商品を見る <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
