const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

// 開始月・終了月は 1〜12。開始 > 終了 の場合は年をまたぐ旬（例: 10月〜1月）として扱う。
const fruits = [
  { name: '温州みかん', icon: '🍊', start: 10, end: 1 },
  { name: 'せとか', icon: '🍊', start: 2, end: 4 },
  { name: '不知火', icon: '🍊', start: 2, end: 3 },
  { name: 'レモン', icon: '🍋', start: 9, end: 5 },
]

function segments(start, end) {
  if (start <= end) return [[start, end]]
  return [[start, 12], [1, end]]
}

export default function SeasonalCalendar() {
  return (
    <section id="calendar" className="season">
      <div className="container">
        <div className="season-head fade-up">
          <p className="section-label center">Seasonal Calendar</p>
          <h2 className="section-title serif center">旬の柑橘カレンダー</h2>
        </div>

        <div className="season-table fade-up">
          <div className="season-row season-row-header">
            <div className="season-label" />
            {MONTHS.map(m => (
              <div key={m} className="season-month">{m}</div>
            ))}
          </div>

          {fruits.map(f => (
            <div key={f.name} className="season-row">
              <div className="season-label">
                <span className="season-icon" aria-hidden="true">{f.icon}</span>
                {f.name}
              </div>
              <div className="season-track">
                {segments(f.start, f.end).map(([s, e], i) => (
                  <span
                    key={i}
                    className="season-bar"
                    style={{ gridColumn: `${s + 1} / ${e + 2}` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
