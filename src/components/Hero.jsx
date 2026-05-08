import heroImg from '../assets/Hero_new.png'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="みかん農園" className="hero-bg-img" />
      </div>
      <div className="hero-content">
        {/* <p className="hero-kicker">Isa Mikan Farm — 沖縄・本部町伊豆味</p> */}
        <h1 className="hero-title">山の恵み、<br />手でひとつ<br />ひとつ。</h1>
        <p className="hero-tagline">やんばるの寒暖差が育てた濃厚な甘み。<br />三代続く農家が、収穫した日にあなたの元へ届けます。</p>
        <a href="#products" className="btn-outline">商品を見る <span className="arrow">→</span></a>
      </div>

      <div className="hero-scroll-cue">
        <span>scroll</span>
        <div className="line" />
      </div>
    </section>
  )
}
