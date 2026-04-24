
export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="ph ph-forest" style={{ width: '100%', height: '100%' }}>
          <span className="ph-label">mikan orchard</span>
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-kicker">Okinawa, Japan — 伊佐みかん園</p>
        <h1 className="hero-title">山の恵み、<br />手でひとつ<br />ひとつ。</h1>
        <p className="hero-tagline">やんばるの大自然で育てたタンカン・シークヮーサーを、産地直送でお届けします。</p>
        <a href="#products" className="btn-outline">商品を見る <span className="arrow">→</span></a>
      </div>

      <div className="hero-scroll-cue">
        <span>scroll</span>
        <div className="line" />
      </div>
      

    </section>

  )
}
