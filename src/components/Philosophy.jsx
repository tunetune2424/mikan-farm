import soilImg from '../assets/soil.jpeg'
import harvestImg from '../assets/harvest.png'
import deliveryImg from '../assets/delivery.png'

export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy">
      <div className="container">
        <div className="philosophy-intro fade-up">
          <p className="section-label">Philosophy</p>
          <h2 className="section-title serif">私たちの<br />こだわり</h2>
        </div>

        <div className="philosophy-quote fade-up">
          <p className="philosophy-quote-text">
            低農薬。<br />手摘み。<br />当日出荷。
          </p>
          <p className="philosophy-quote-sub">
            三つのこだわりが、やんばるの味をあなたの元へ届けます。
          </p>
        </div>

        <div className="philo-item fade-up">
          <div className="philo-image">
            <img src={soilImg} alt="やんばるの土" />
          </div>
          <div className="philo-text">
            <span className="philo-num">01</span>
            <span className="philo-heading-en">Soil</span>
            <h3 className="philo-heading serif">やんばるの土を育てる</h3>
            <p className="philo-body">化学肥料に頼らず、やんばるの森の落ち葉や有機物を活かした土づくりを実践しています。豊かな微生物が根を支え、柑橘本来の甘みと香りを引き出します。</p>
            <div className="philo-tags">
              <span className="philo-tag">低農薬</span>
              <span className="philo-tag">有機肥料</span>
            </div>
          </div>
        </div>

        <div className="philo-item reverse fade-up">
          <div className="philo-image">
            <img src={harvestImg} alt="手摘み収穫" />
          </div>
          <div className="philo-text">
            <span className="philo-num">02</span>
            <span className="philo-heading-en">Harvest</span>
            <h3 className="philo-heading serif">手摘みにこだわる</h3>
            <p className="philo-body">タンカンは皮が薄く傷つきやすいため、すべて手作業で一つひとつ丁寧に収穫します。熟し具合を手のひらで確かめながら、最高の状態で摘み取ります。</p>
            <div className="philo-tags">
              <span className="philo-tag">手作業</span>
              <span className="philo-tag">完熟収穫</span>
            </div>
          </div>
        </div>

        <div className="philo-item fade-up">
          <div className="philo-image">
            <img src={deliveryImg} alt="収穫即日出荷" />
          </div>
          <div className="philo-text">
            <span className="philo-num">03</span>
            <span className="philo-heading-en">Delivery</span>
            <h3 className="philo-heading serif">収穫即日出荷</h3>
            <p className="philo-body">収穫したその日のうちに箱詰めして発送します。沖縄から全国へ、新鮮な状態でお届けすることが私たちの鮮度保証です。</p>
            <div className="philo-tags">
              <span className="philo-tag">産地直送</span>
              <span className="philo-tag">鮮度保証</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
