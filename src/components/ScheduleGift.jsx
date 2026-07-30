import { Link } from 'react-router-dom'

// 収穫年度（5月始まり〜翌4月）で表示するため、暦月を軸位置に変換する
const AXIS_MONTHS = ['5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月']
function axisPos(calendarMonth) {
  return ((calendarMonth - 5 + 12) % 12) + 1
}

const fruits = [
  { name: '温州みかん', start: 10, end: 1, color: 'orange' },
  { name: 'せとか', start: 2, end: 4, color: 'orange' },
  { name: '不知火', start: 2, end: 3, color: 'yellow' },
  { name: 'レモン', start: 9, end: 5, color: 'green' },
]

export default function ScheduleGift() {
  return (
    <section id="schedule" className="schedule-gift">
      <div className="container">
        <div className="schedule-card schedule-card-full fade-up">
          <h3 className="schedule-title">収穫・発送スケジュール</h3>
          <div className="season-table">
            <div className="season-row season-row-header">
              <div className="season-label" />
              {AXIS_MONTHS.map(m => (
                <div key={m} className="season-month">{m}</div>
              ))}
            </div>
            {fruits.map(f => {
              const s = axisPos(f.start)
              const e = axisPos(f.end)
              const [from, to] = s <= e ? [s, e] : [1, 12]
              return (
                <div key={f.name} className="season-row">
                  <div className="season-label">{f.name}</div>
                  <div className="season-track">
                    <span
                      className={`season-bar season-bar-${f.color}`}
                      style={{ gridColumn: `${from + 1} / ${to + 2}` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <Link to="/calendar" className="btn-line schedule-cta">カレンダーの詳細を見る →</Link>
        </div>
      </div>
    </section>
  )
}
