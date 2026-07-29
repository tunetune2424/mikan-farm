const items = [
  {
    title: '低農薬栽培',
    desc: 'できるだけ農薬を使わず、自然の力を生かして育てています。',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 42c0-11 6-24 16-30-2 12-2 22-16 30Z" />
        <path d="M24 42c0-11-6-24-16-30 2 12 2 22 16 30Z" />
        <path d="M24 42V20" />
      </svg>
    ),
  },
  {
    title: '手摘み収穫',
    desc: '一つひとつ丁寧に手で摘み、最適なタイミングで収穫します。',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="7" />
        <path d="M13 40c0-8 5-14 11-14s11 6 11 14" />
        <path d="M24 30v6" />
      </svg>
    ),
  },
  {
    title: '産地直送',
    desc: '採れたてをそのまま農園から直送。新鮮な美味しさをお届けします。',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="16" width="24" height="16" rx="1.5" />
        <path d="M28 21h8l8 7v8h-16z" />
        <circle cx="14" cy="36" r="3.2" />
        <circle cx="36" cy="36" r="3.2" />
      </svg>
    ),
  },
]

export default function Strengths() {
  return (
    <section id="strengths" className="strengths">
      <div className="container">
        <div className="strengths-head fade-up">
          <p className="section-label center">Strength</p>
          <h2 className="section-title serif center">私たちの3つのこだわり</h2>
        </div>

        <div className="strengths-grid">
          {items.map((item, i) => (
            <div key={item.title} className="strength-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="strength-icon">{item.icon}</div>
              <h3 className="strength-title serif">{item.title}</h3>
              <p className="strength-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
