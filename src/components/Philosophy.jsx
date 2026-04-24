export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy">
      <div className="philosophy-intro">
        <p className="section-label">Philosophy</p>
        <h2 className="section-title serif">私たちの<br />こだわり</h2>
        <p>やんばるの自然の力を最大限に引き出すために、私たちは三つのことにこだわり続けています。</p>
      </div>

      <div className="philo-item">
        <div className="philo-image">
          <div className="ph ph-green" style={{ width: '100%', height: '100%' }}>
            <span className="ph-label">soil</span>
          </div>
        </div>
        <div className="philo-text">
          <span className="philo-num">01</span>
          <h3 className="philo-heading serif">
            <span className="philo-heading-en">Soil</span>
            やんばるの土を育てる
          </h3>
          <p className="philo-body">化学肥料に頼らず、やんばるの森の落ち葉や有機物を活かした土づくりを実践しています。豊かな微生物が根を支え、柑橘本来の甘みと香りを引き出します。</p>
          <div className="philo-tags">
            <span className="philo-tag">低農薬</span>
            <span className="philo-tag">有機肥料</span>
          </div>
        </div>
      </div>

      <div className="philo-item reverse">
        <div className="philo-image">
          <div className="ph ph-orange" style={{ width: '100%', height: '100%' }}>
            <span className="ph-label">harvest</span>
          </div>
        </div>
        <div className="philo-text">
          <span className="philo-num">02</span>
          <h3 className="philo-heading serif">
            <span className="philo-heading-en">Harvest</span>
            手摘みにこだわる
          </h3>
          <p className="philo-body">タンカンは皮が薄く傷つきやすいため、すべて手作業で一つひとつ丁寧に収穫します。熟し具合を手のひらで確かめながら、最高の状態で摘み取ります。</p>
          <div className="philo-tags">
            <span className="philo-tag">手作業</span>
            <span className="philo-tag">完熟収穫</span>
          </div>
        </div>
      </div>

      <div className="philo-item">
        <div className="philo-image">
          <div className="ph ph-forest" style={{ width: '100%', height: '100%' }}>
            <span className="ph-label">delivery</span>
          </div>
        </div>
        <div className="philo-text">
          <span className="philo-num">03</span>
          <h3 className="philo-heading serif">
            <span className="philo-heading-en">Delivery</span>
            収穫即日出荷
          </h3>
          <p className="philo-body">収穫したその日のうちに箱詰めして発送します。沖縄から全国へ、新鮮な状態でお届けすることが私たちの鮮度保証です。</p>
          <div className="philo-tags">
            <span className="philo-tag">産地直送</span>
            <span className="philo-tag">鮮度保証</span>
          </div>
        </div>
      </div>
    </section>
  )
}
