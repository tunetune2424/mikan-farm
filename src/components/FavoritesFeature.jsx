import wenzhouImg from '../assets/unsyuumikan.jpeg'
import setokaPlaceholder from '../assets/tankan.jpeg'

const heartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.4-9.4-8.8C1 8 2.4 5 5.6 4.6c2-.3 3.7.8 4.9 2.6 1.2-1.8 3-2.9 4.9-2.6C18.6 5 20 8 20.4 11.2 22.9 15.6 12 20 12 20Z" />
  </svg>
)
const clipboardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="14" height="17" rx="2" /><rect x="9" y="2.5" width="6" height="3" rx="1" /><path d="M8 11h8M8 15h5" />
  </svg>
)
const cartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" />
  </svg>
)
const bellIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" /><path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
)

const strip = [
  { icon: heartIcon, title: 'ワンタップで登録', desc: '気になる商品を簡単にお気に入りへ。' },
  { icon: clipboardIcon, title: 'あとで比較できる', desc: 'まとめて比較してぴったりを選べます。' },
  { icon: cartIcon, title: 'スムーズに購入', desc: 'お気に入りからそのままカートへ。' },
  { icon: bellIcon, title: '再入荷をお知らせ', desc: '在庫切れ商品は再入荷通知をお届け。' },
]

const mockItems = [
  { img: wenzhouImg, name: '温州みかん', sub: '2kg（約15〜20個）', price: '2,980', badge: '人気No.1', faved: true },
  { img: setokaPlaceholder, name: 'せとか', sub: '2kg（約6〜8個）', price: '3,580', badge: '濃厚な甘さ', faved: false },
]

export default function FavoritesFeature() {
  return (
    <section id="favorites" className="feature-showcase">
      <div className="container">
        <div className="feature-showcase-grid">
          <div className="feature-showcase-text fade-up">
            <div className="feature-showcase-label-row">
              <span className="feature-showcase-icon">{heartIcon}</span>
              <p className="feature-showcase-label">お気に入り登録</p>
            </div>
            <h2 className="section-title serif">
              気になる商品を<br />あとでゆっくり。
            </h2>
            <p className="feature-showcase-desc">
              お気に入りに登録しておけば、あとでまとめて比較したり、スムーズにご購入いただけます。
            </p>
            <a href="#products" className="btn-line">使い方を見る →</a>
          </div>

          <div className="feature-showcase-phone fade-up" style={{ transitionDelay: '0.1s' }}>
            <div className="phone-mock" aria-hidden="true">
              <div className="phone-mock-notch" />
              <div className="phone-mock-statusbar">
                <span>9:41</span>
                <span className="phone-mock-statusicons">
                  <svg viewBox="0 0 20 12" width="16" height="10" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.5" /><rect x="5" y="4" width="3" height="8" rx="0.5" /><rect x="10" y="1" width="3" height="11" rx="0.5" /><rect x="15" y="3" width="4" height="9" rx="1.5" opacity="0.5" /></svg>
                </span>
              </div>
              <div className="phone-mock-header">
                <span>‹</span>
                <span>お気に入り</span>
                <span>⚙</span>
              </div>
              <p className="phone-mock-tag">商品（{mockItems.length}）</p>
              <div className="phone-mock-list">
                {mockItems.map(item => (
                  <div key={item.name} className="phone-mock-item">
                    <img src={item.img} alt="" />
                    <div className="phone-mock-item-info">
                      <p className="phone-mock-item-name">{item.name}</p>
                      <p className="phone-mock-item-sub">{item.sub}</p>
                      <p className="phone-mock-item-price">¥{item.price}（税込）</p>
                      <span className="phone-mock-item-badge">{item.badge}</span>
                    </div>
                    <span className={`phone-mock-heart${item.faved ? ' on' : ''}`}>{heartIcon}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="phone-mock-cta" disabled>すべての商品を見る →</button>
            </div>
            <span className="feature-showcase-heart-badge">{heartIcon}</span>
          </div>
        </div>

        <div className="gift-strip feature-showcase-strip fade-up">
          {strip.map(f => (
            <div key={f.title} className="gift-strip-item">
              <span className="gift-strip-icon">{f.icon}</span>
              <div>
                <p className="gift-strip-title">{f.title}</p>
                <p className="gift-strip-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
