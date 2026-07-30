import farmImg from '../assets/farm.png'
import harvestImg from '../assets/harvest.png'
import deliveryImg from '../assets/delivery.png'
import tankanImg from '../assets/tankan.jpeg'
import izumiImg from '../assets/izumibeni.jpeg'

// Instagramアカウントが決まったら、実際の投稿と連携するかURLを設定してください。
const INSTAGRAM_HANDLE = '@yamahara_mikan_farm'
const INSTAGRAM_URL = ''

// ご家族の農園写真がまだ無いため、6枚目はプレースホルダーです（実写真推奨。詳細はチャットの説明を参照）。
const photos = [
  { src: tankanImg, alt: '収穫したみかん' },
  { src: izumiImg, alt: '断面のみかん' },
  { src: farmImg, alt: '農園の風景' },
  { src: deliveryImg, alt: '箱詰めしたみかん' },
  { src: harvestImg, alt: '手摘み収穫の様子' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function InstagramFeed() {
  return (
    <section id="instagram" className="instagram">
      <div className="container">
        <div className="instagram-head fade-up">
          <p className="instagram-kicker">＼ フォローして最新情報をチェック ／</p>
          <h2 className="instagram-title">Instagram</h2>
          {INSTAGRAM_URL ? (
            <a href={INSTAGRAM_URL} className="instagram-handle"><InstagramIcon /> {INSTAGRAM_HANDLE}</a>
          ) : (
            <span className="instagram-handle disabled" title="URL未設定"><InstagramIcon /> {INSTAGRAM_HANDLE}</span>
          )}
        </div>

        <div className="instagram-grid">
          {photos.map((p, i) => (
            <div key={i} className="gallery-item fade-up" style={{ transitionDelay: `${i * 0.05}s` }}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </div>
          ))}
          <div className="gallery-item gallery-item-placeholder fade-up" style={{ transitionDelay: '0.3s' }}>
            <span>ご家族の写真<br />準備中</span>
          </div>
        </div>
      </div>
    </section>
  )
}
