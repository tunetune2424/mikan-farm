const items = [
  {
    title: '産地直送',
    sub: '採れたてをそのままお届け',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="12" height="8" rx="1" /><path d="M14 11h4l4 3.5V16h-8z" />
        <circle cx="7" cy="18.5" r="1.6" /><circle cx="17" cy="18.5" r="1.6" />
      </svg>
    ),
  },
  {
    title: '低農薬栽培',
    sub: '安心・安全なみかん作り',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c0-5.5 3-12 8-15-1 6-1 11-8 15Z" /><path d="M12 21c0-5.5-3-12-8-15 1 6 1 11 8 15Z" />
      </svg>
    ),
  },
  {
    title: '三代続く農園',
    sub: '1962年創業の信頼と実績',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V10l8-6 8 6v11" /><path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: '丁寧な手仕事',
    sub: 'ひとつひとつ手で選別',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="3" /><path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      </svg>
    ),
  },
  {
    title: 'ギフト対応',
    sub: 'のし・メッセージカード無料',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="12" rx="1" /><path d="M3 13h18" /><path d="M12 9v12" />
        <path d="M12 9c-2 0-3.5-1-3.5-2.5S9.5 4 11 4c1.2 0 1.8 1 1 2.2M12 9c2 0 3.5-1 3.5-2.5S14.5 4 13 4c-1.2 0-1.8 1-1 2.2" />
      </svg>
    ),
  },
]

export default function Strengths() {
  return (
    <section id="strengths" className="strengths">
      <div className="container">
        <div className="strengths-row">
          {items.map((item, i) => (
            <div key={item.title} className="strength-item fade-up" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="strength-icon-sm">{item.icon}</div>
              <div>
                <p className="strength-item-title">{item.title}</p>
                <p className="strength-item-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
