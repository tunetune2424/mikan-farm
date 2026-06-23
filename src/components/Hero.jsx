import heroImg from '../assets/hero.jpeg'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="みかん農園" className="hero-bg-img" />
      </div>

      <p className="hero-vert-text">Isa Mikan Farm · やんばるの恵み</p>

      <div className="hero-content">
        <p className="hero-kicker">OKINAWA · NAKIJIN · EST. 1962</p>
        <h1 className="hero-title">
          山の恵み、<br />
          手でひとつ<br />
          ひとつ。
        </h1>
        <div className="hero-actions">
          <p className="hero-tagline">
            三代続く農家が、収穫した日にお届けします。
          </p>
          <a href="#products" className="btn-outline">
            商品を見る <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span>scroll</span>
        <div className="line" />
      </div>
    </section>
  )
}
