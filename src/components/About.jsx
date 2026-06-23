import aboutImg from '../assets/farm.png'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image fade-up">
            <img src={aboutImg} alt="みかん農場の風景" />
            <div className="about-year">
              <span className="about-year-num">1962</span>
              <span className="about-year-label">創業 · Est.</span>
            </div>
          </div>

          <div className="about-text">
            <p className="section-label fade-up">About</p>
            <h2 className="section-title serif fade-up" style={{ transitionDelay: '0.1s' }}>
              三代続く<br />やんばるの農家
            </h2>
            <p className="lead fade-up" style={{ transitionDelay: '0.15s' }}>
              沖縄県国頭郡今帰仁村の山あいで、祖父の代から三代にわたってタンカンやシークヮーサーを育ててきました。
            </p>
            <p className="about-text-body fade-up" style={{ transitionDelay: '0.2s' }}>
              やんばるの山々に囲まれた大きな寒暖差が、濃厚な甘みと豊かな香りを生み出します。化学肥料に頼らず、自然の恵みを活かした農法を守り続けています。手間はかかりますが、この土地でしか生まれない味を届けることが私たちの誇りです。
            </p>
            <div className="signature fade-up" style={{ transitionDelay: '0.25s' }}>
              <div>
                <p className="signature-text">農園主</p>
                <p className="signature-name">伊佐 家三代</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat fade-up">
            <span className="stat-num">60+</span>
            <span className="stat-label">年の歴史</span>
            <span className="stat-sub">YEARS OF HISTORY</span>
          </div>
          <div className="stat fade-up" style={{ transitionDelay: '0.1s' }}>
            <span className="stat-num">3</span>
            <span className="stat-label">代目農家</span>
            <span className="stat-sub">GENERATION FARM</span>
          </div>
          <div className="stat fade-up" style={{ transitionDelay: '0.2s' }}>
            <span className="stat-num">30+</span>
            <span className="stat-label">品種を栽培</span>
            <span className="stat-sub">VARIETIES GROWN</span>
          </div>
        </div>
      </div>
    </section>
  )
}
