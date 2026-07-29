// サンプルの掲載例です。実際のお客様の声に差し替えてご利用ください。
const reviews = [
  { rating: 5, text: '甘くてジューシーで感動しました！子どもたちも喜んで食べています。', name: '沖縄県 A様' },
  { rating: 5, text: 'タンカンのとろける食感と濃厚な甘みに毎年リピートしています！', name: '大阪府 B様' },
  { rating: 4, text: '新鮮で香りもよく、贈り物にも最適です。', name: '福岡県 C様' },
]

function Stars({ rating }) {
  return (
    <span className="voice-stars" aria-label={`評価 ${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'on' : ''}>★</span>
      ))}
    </span>
  )
}

export default function Voice() {
  return (
    <section id="voice" className="voice">
      <div className="container">
        <div className="voice-head fade-up">
          <p className="section-label center">Voice</p>
          <h2 className="section-title serif center">お客様の声</h2>
        </div>

        <div className="voice-grid">
          {reviews.map((r, i) => (
            <div key={r.name} className="voice-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <Stars rating={r.rating} />
              <p className="voice-text">{r.text}</p>
              <p className="voice-name">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
