import harvestImg from '../assets/harvest.png'
import soilImg from '../assets/soil.jpeg'
import farmImg from '../assets/farm.png'
import tankanImg from '../assets/tankan.jpeg'

// サンプルのお知らせです。実際の農園の最新情報に差し替えてご利用ください。
const news = [
  { date: '2024.05.10', tag: 'お知らせ', img: harvestImg, title: '今年の収穫が始まりました！', desc: '今年も甘くて美味しいみかんが育ちました。収穫の様子をお届けします。' },
  { date: '2024.05.05', tag: '畑の様子', img: soilImg, title: 'みかんの花が咲きました', desc: '畑一面に白い花が咲き、良い香りに包まれています。' },
  { date: '2024.04.28', tag: 'お知らせ', img: farmImg, title: 'ゴールデンウィークの発送について', desc: 'GW期間中もご注文いただけます。発送スケジュールはこちら。' },
  { date: '2024.04.20', tag: '畑の様子', img: tankanImg, title: '摘果作業を行いました', desc: '美味しいみかんを育てるために、丁寧に摘果しています。' },
]

export default function News() {
  return (
    <section id="news" className="news">
      <div className="container">
        <div className="products-head-row fade-up">
          <h2 className="section-title serif">農園からのお知らせ</h2>
          <a href="#news" className="products-see-all">すべて見る →</a>
        </div>

        <div className="news-grid">
          {news.map((n, i) => (
            <div key={n.title} className="news-card fade-up" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="news-card-image">
                <img src={n.img} alt="" />
                <span className="news-card-tag">{n.tag}</span>
              </div>
              <p className="news-card-date">{n.date}</p>
              <h3 className="news-card-title">{n.title}</h3>
              <p className="news-card-desc">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
