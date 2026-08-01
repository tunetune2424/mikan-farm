import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.jpeg'
import wenzhouImg from '../assets/unsyuumikan.jpeg'
import { SHOP_ENABLED } from '../siteConfig'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="みかん農園" className="hero-bg-img" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          太陽をたっぷり浴びて、<br />山の恵みをお届けします。
        </h1>
        <p className="hero-tagline">
          {SHOP_ENABLED
            ? '三代続くみかん農園から、旬の美味しさを産地直送でお届けします。'
            : '三代続くみかん農園で、丹精込めてみかんを育てています。'}
        </p>
        <div className="hero-actions">
          {SHOP_ENABLED ? (
            <a href="#products" className="btn-fill">
              旬のおすすめを見る <span className="arrow">→</span>
            </a>
          ) : (
            <Link to="/calendar" className="btn-fill">
              みかん狩りを予約する <span className="arrow">→</span>
            </Link>
          )}
          <a href="#about" className="btn-outline">
            農園について
          </a>
        </div>
      </div>

      {SHOP_ENABLED && (
        <div className="hero-pick-card">
          <div className="hero-pick-top">
            <span className="hero-pick-badge">🎁 旬のおすすめ</span>
            <button type="button" className="hero-pick-fav" aria-label="お気に入り(準備中)" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-9.4-8.8C1 8 2.4 5 5.6 4.6c2-.3 3.7.8 4.9 2.6 1.2-1.8 3-2.9 4.9-2.6C18.6 5 20 8 20.4 11.2 22.9 15.6 12 20 12 20Z" /></svg>
            </button>
          </div>
          <div className="hero-pick-body">
            <img src={wenzhouImg} alt="温州みかん" className="hero-pick-img" />
            <div>
              <h3 className="hero-pick-name">温州みかん</h3>
              <p className="hero-pick-desc">甘さと酸味のバランスが絶妙</p>
              <p className="hero-pick-rating"><span className="voice-stars"><span className="on">★★★★★</span></span> 4.9（128件）</p>
            </div>
          </div>
          <div className="hero-pick-footer">
            <span className="hero-pick-price">2kg <strong>¥2,980</strong>〜</span>
            <button type="button" className="btn-fill hero-pick-btn" disabled>カートに入れる</button>
          </div>
        </div>
      )}
    </section>
  )
}
