import farmImg from '../assets/farm.png'
import harvestImg from '../assets/harvest.png'
import deliveryImg from '../assets/delivery.png'
import aboutImg from '../assets/about.jpeg'
import tankanImg from '../assets/tankan.jpeg'

// ご家族の農園写真がまだ無いため、6枚目はプレースホルダーです。
// 実際の写真が用意でき次第、他の写真と同じ形で差し替えてください。
const photos = [
  { src: farmImg, alt: '農園の風景' },
  { src: harvestImg, alt: '手摘み収穫の様子' },
  { src: tankanImg, alt: '収穫したみかん' },
  { src: aboutImg, alt: '農園から見える海' },
  { src: deliveryImg, alt: '収穫即日出荷の様子' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-head fade-up">
          <p className="section-label center">Gallery</p>
          <h2 className="section-title serif center">農園の風景</h2>
        </div>

        <div className="gallery-grid">
          {photos.map((p, i) => (
            <div key={p.alt} className="gallery-item fade-up" style={{ transitionDelay: `${i * 0.05}s` }}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </div>
          ))}
          <div className="gallery-item gallery-item-placeholder fade-up" style={{ transitionDelay: '0.25s' }}>
            <span>ご家族の写真<br />準備中</span>
          </div>
        </div>

        <div className="gallery-cta fade-up">
          <button type="button" className="btn-line">もっと見る <span className="arrow">→</span></button>
        </div>
      </div>
    </section>
  )
}
