// マイページ関連の機能は今回デザインのみの実装で、実際には動作しません。
// 「お気に入り登録」は FavoritesFeature.jsx で詳細セクションとして別途実装しています。
const items = [
  {
    title: 'あとで買う',
    desc: 'カートに入れる前に保存。買い忘れを防げます。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>
    ),
  },
  {
    title: 'ご注文後の流れ',
    desc: '発送準備からお届けまでの流れをご確認いただけます。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    title: '配送状況の確認',
    desc: 'マイページから配送状況やお届け予定日を確認できます。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h11l4-5h3v9H3z" /><circle cx="7.5" cy="19" r="1.6" /><circle cx="16.5" cy="19" r="1.6" /></svg>
    ),
  },
]

export default function AppBenefits() {
  return (
    <section id="mypage" className="app-benefits">
      <div className="container">
        <div className="app-benefits-grid">
          {items.map((item, i) => (
            <div key={item.title} className="app-benefit-card fade-up" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="app-benefit-icon">{item.icon}</div>
              <h3 className="app-benefit-title">{item.title}</h3>
              <p className="app-benefit-desc">{item.desc}</p>
              <div className="app-benefit-mock" aria-hidden="true">
                <div className="app-benefit-mock-icon">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
