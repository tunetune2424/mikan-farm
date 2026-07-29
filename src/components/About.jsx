import aboutImg from '../assets/farm.png'
import { BRAND_NAME } from '../siteConfig'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image fade-up">
            <img src={aboutImg} alt="みかん農場の風景" />
          </div>

          <div className="about-text">
            <p className="section-label fade-up">Story</p>
            <h2 className="section-title serif fade-up" style={{ transitionDelay: '0.1s' }}>
              三代続く、<br />みかん農家です。
            </h2>
            <p className="about-text-body fade-up" style={{ transitionDelay: '0.2s' }}>
              私たち{BRAND_NAME}は、祖父の代から三代にわたりこの地でみかんを育ててきました。山の斜面に広がる段々畑、海からのやさしい風、そしてたっぷりの太陽。恵まれた自然の中で、ひとつひとつ丁寧に育てています。
            </p>
            <a href="#philosophy" className="btn-line">
              農園について詳しく見る <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
