import wenzhouImg from '../assets/unsyuumikan.jpeg'
import lemonImg from '../assets/shikuwasa.jpg'
// せとか・不知火の実物写真がまだ無いため、近い色味の既存写真を仮置きしています。
// 実際の写真が用意でき次第、下記の import を差し替えてください。
import setokaPlaceholder from '../assets/tankan.jpeg'
import shiranuiPlaceholder from '../assets/izumibeni.jpeg'

const products = [
  {
    img: wenzhouImg,
    badge: '人気No.1',
    name: '温州みかん',
    desc: '甘さと酸味のバランスが良い定番品種',
    price: '2,980',
    rating: 4.9,
    reviews: 128,
  },
  {
    img: setokaPlaceholder,
    badge: '人気No.2',
    name: 'せとか',
    desc: 'とろける食感と濃厚な甘み',
    price: '3,580',
    rating: 4.8,
    reviews: 96,
    isPlaceholderImage: true,
  },
  {
    img: shiranuiPlaceholder,
    badge: '人気No.3',
    name: '不知火（しらぬい）',
    desc: '濃厚な甘みとジューシーな果肉',
    price: '3,280',
    rating: 4.7,
    reviews: 75,
    isPlaceholderImage: true,
  },
  {
    img: lemonImg,
    badge: '',
    name: 'グリーンレモン',
    desc: '爽やかな香りと酸味',
    price: '1,480',
    rating: 4.6,
    reviews: 43,
    isPlaceholderImage: true,
  },
]

function Stars({ rating }) {
  const full = Math.round(rating)
  return (
    <span className="voice-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'on' : ''}>★</span>
      ))}
    </span>
  )
}

export default function Products() {
  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products-head-row fade-up">
          <h2 className="section-title serif">人気の商品</h2>
          <a href="#products" className="products-see-all">すべて見る →</a>
        </div>

        <div className="product-grid">
          {products.map((p, i) => (
            <div key={p.name} className="product-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="product-card-image">
                {p.badge && <span className="product-card-badge">{p.badge}</span>}
                <img src={p.img} alt={p.name} />
                {p.isPlaceholderImage && <span className="product-card-placeholder-tag">写真は仮画像</span>}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name serif">{p.name}</h3>
                <p className="product-card-desc">{p.desc}</p>
                <p className="product-card-rating">
                  <Stars rating={p.rating} /> {p.rating}（{p.reviews}件）
                </p>
                <div className="product-card-footer">
                  <span className="price-num">2kg ¥{p.price}<span className="price-unit">（税込）〜</span></span>
                  <div className="product-card-actions">
                    <button type="button" className="product-icon-btn" aria-label="カートに入れる(準備中)" disabled>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
                    </button>
                    <button type="button" className="product-icon-btn" aria-label="お気に入り(準備中)" disabled>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-9.4-8.8C1 8 2.4 5 5.6 4.6c2-.3 3.7.8 4.9 2.6 1.2-1.8 3-2.9 4.9-2.6C18.6 5 20 8 20.4 11.2 22.9 15.6 12 20 12 20Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
