import tankanImg from '../assets/tankan.jpeg'
import sekukwasaImg from '../assets/shikuwasa.jpg'
import izumiImg from '../assets/izumibeni.jpeg'
import wenzhouImg from '../assets/unsyuumikan.jpeg'

const products = [
  {
    img: wenzhouImg,
    name: '温州みかん',
    desc: '甘みと酸味のバランスが良い定番のみかん。',
    price: '2,800',
  },
  {
    img: tankanImg,
    name: 'タンカン',
    desc: 'とろける食感と濃厚な甘みが特徴の高糖度種。',
    price: '3,200',
  },
  {
    img: izumiImg,
    name: '伊豆味柑',
    desc: '甘みの中にほどよい酸味が溶け込む希少な在来種。',
    price: '2,500',
  },
  {
    img: sekukwasaImg,
    name: 'シークヮーサー',
    desc: '爽やかな香りと酸味が沖縄料理に欠かせない一品。',
    price: '1,800',
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

        <div className="product-grid">
          {products.map((p, i) => (
            <div key={p.name} className="product-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="product-card-image">
                <img src={p.img} alt={p.name} />
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
            ご注文・お問い合わせはこちら <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
