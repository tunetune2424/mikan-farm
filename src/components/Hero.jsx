import heroImg from '../assets/hero.jpeg'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="みかん農園" className="hero-bg-img" />
      </div>

      <div className="hero-content">
        <p className="hero-kicker">OKINAWA · NAKIJIN · EST. 1962</p>
        <h1 className="hero-title">
          太陽を育てる、<br />山のみかん。
        </h1>
        <p className="hero-tagline">
          愛情をたっぷり注いで育てた、甘くておいしいみかんをお届けします。
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn-fill">
            商品を見る <span className="arrow">→</span>
          </a>
          <a href="#about" className="btn-outline">
            農園について <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
