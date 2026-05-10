import aboutImg from '../assets/about.jpeg'

export default function About(){
  return(
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-image">
          <img src={aboutImg} alt="みかん農場の風景" />
          <div className="stamp">
            <span>Since</span>
            <strong>1962</strong>
          </div>
        </div>
        <div className="about-text">
          <p className="section-label">About</p>
          <h2 className="section-title serif">三代続く<br />やんばるの農家</h2>
          <p className="lead">沖縄県本部町伊豆味の山あいで、祖父の代から三代にわたってタンカンやシークヮーサーを育ててきました。やんばるの山々に囲まれた大きな寒暖差が、濃厚な甘みと豊かな香りを生み出します。</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-num">60+</span>
              <span className="stat-label">年の歴史</span>
            </div>
            <div className="stat">
              <span className="stat-num">3</span>
              <span className="stat-label">代目農家</span>
            </div>
            <div className="stat">
              <span className="stat-num">30+</span>
              <span className="stat-label">品種を栽培</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
