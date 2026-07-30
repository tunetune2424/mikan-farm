import giftImg from '../assets/delivery.png'

// ラッピング・掛け紙入りの実際のギフト写真がまだ無いため、既存の箱詰め写真を仮置きしています。
const noshiIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15c-3-1-5-3-5-6a5 5 0 0 1 10 0c0 3-2 5-5 6Z" /><path d="M12 15v6" /><path d="M9 21h6" />
  </svg>
)
const cardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 15l3-3 2 2 3-4 2 3" />
  </svg>
)
const wrapIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="18" height="12" rx="1" /><path d="M3 13h18" /><path d="M12 9v12" />
    <path d="M12 9c-2 0-3.5-1-3.5-2.5S9.5 4 11 4c1.2 0 1.8 1 1 2.2M12 9c2 0 3.5-1 3.5-2.5S14.5 4 13 4c-1.2 0-1.8 1-1 2.2" />
  </svg>
)
const truckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="7" width="13" height="9" rx="1" /><path d="M14 10h4l4 3.5V16h-8z" />
    <circle cx="6" cy="18.5" r="1.8" /><circle cx="17" cy="18.5" r="1.8" />
  </svg>
)
const headsetIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2" y="13" width="5" height="7" rx="2" /><rect x="17" y="13" width="5" height="7" rx="2" />
    <path d="M20 20v1a3 3 0 0 1-3 3h-3" />
  </svg>
)

const topFeatures = [
  { icon: noshiIcon, title: 'のし対応', desc: '各種のしをご用意しています' },
  { icon: cardIcon, title: 'メッセージカード', desc: 'オリジナルメッセージを添えられます' },
  { icon: wrapIcon, title: 'ラッピング対応', desc: '心を込めて丁寧にラッピングいたします' },
]

const stripFeatures = [
  { icon: noshiIcon, title: 'のし対応', desc: '内のし・外のし各種ご用意' },
  { icon: cardIcon, title: 'メッセージカード', desc: '定型文またはオリジナル印字OK' },
  { icon: wrapIcon, title: 'ラッピング', desc: '化粧箱にお入れし、丁寧に包装します' },
  { icon: truckIcon, title: 'お届け日時指定', desc: 'ご希望の日時にお届けします' },
]

export default function GiftService() {
  return (
    <section id="gift" className="gift-service">
      <div className="container">
        <div className="gift-hero">
          <div className="gift-hero-text fade-up">
            <p className="section-label">Gift Service</p>
            <h2 className="section-title serif">
              大切な方へ、<br />心を込めてお届けします。
            </h2>
            <p className="gift-hero-desc">
              のし・ラッピング・メッセージカードなど、各種ギフト対応を無料で承っております。
            </p>
            <div className="gift-hero-features">
              {topFeatures.map(f => (
                <div key={f.title} className="gift-hero-feature">
                  <span className="gift-hero-feature-icon">{f.icon}</span>
                  <p className="gift-hero-feature-title">{f.title}</p>
                  <p className="gift-hero-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-line">ギフトについて詳しく見る →</a>
          </div>

          <div className="gift-hero-image fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src={giftImg} alt="ギフト用に箱詰めされたみかん（仮画像）" />
            <span className="gift-hero-badge">ギフト対応<br />すべて<br /><strong>無料</strong></span>
          </div>
        </div>

        <div className="gift-strip fade-up">
          {stripFeatures.map(f => (
            <div key={f.title} className="gift-strip-item">
              <span className="gift-strip-icon">{f.icon}</span>
              <div>
                <p className="gift-strip-title">{f.title}</p>
                <p className="gift-strip-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gift-consult fade-up">
          <div className="gift-consult-photo">
            <span>ご家族の写真<br />準備中</span>
          </div>
          <div className="gift-consult-text">
            <p className="gift-consult-title">贈り物に迷われたら・・・</p>
            <p className="gift-consult-desc">ギフト選びのご相談もお気軽にどうぞ。スタッフが心を込めてお手伝いします。</p>
          </div>
          <div className="gift-consult-contact">
            <span className="gift-consult-icon">{headsetIcon}</span>
            <div>
              <p className="gift-consult-contact-title">ギフトに関するお問い合わせ</p>
              <p className="gift-consult-contact-desc">平日 9:00-17:00</p>
            </div>
          </div>
          <a href="#contact" className="btn-fill gift-consult-btn">ギフト選びを相談する →</a>
        </div>
      </div>
    </section>
  )
}
