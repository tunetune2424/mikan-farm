import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CalendarPage.css'

const GOOGLE_API_KEY   = import.meta.env.VITE_GOOGLE_API_KEY   || ''
const CALENDAR_ID      = import.meta.env.VITE_CALENDAR_ID      || ''
const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || '#'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear]       = useState(today.getFullYear())
  const [month, setMonth]     = useState(today.getMonth())
  const [avail, setAvail]     = useState({})
  const [loading, setLoading] = useState(false)
  const [isDemo, setIsDemo]   = useState(false)

  useEffect(() => {
    loadMonth(year, month)
  }, [year, month])

  async function loadMonth(y, m) {
    setLoading(true)
    setAvail({})
    try {
      if (!GOOGLE_API_KEY) {
        setAvail(generateDemoData(y, m))
        setIsDemo(true)
        return
      }
      setIsDemo(false)
      const timeMin = new Date(y, m, 1).toISOString()
      const timeMax = new Date(y, m + 1, 0, 23, 59, 59).toISOString()
      const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events` +
        `?key=${GOOGLE_API_KEY}` +
        `&timeMin=${encodeURIComponent(timeMin)}` +
        `&timeMax=${encodeURIComponent(timeMax)}` +
        `&singleEvents=true&orderBy=startTime&maxResults=100`
      const res = await fetch(url)
      const data = await res.json()
      const map = {}
      ;(data.items || []).forEach(ev => {
        const d = (ev.start.dateTime || ev.start.date).slice(0, 10)
        if (!map[d]) map[d] = { am: null, pm: null }
        const t = (ev.summary || '').replace(/[\s　]/g, '') // 半角・全角スペース除去
        const full = t.includes('満員')
        if (t.includes('午前')) map[d].am = full ? 'full' : 'open'
        if (t.includes('午後')) map[d].pm = full ? 'full' : 'open'
      })
      setAvail(map)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const firstDow    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="cal-page">
      <header className="cal-page-header">
        <Link to="/" className="cal-back">← HPに戻る</Link>
        <div className="cal-title-wrap">
          <span className="cal-emoji">🍊</span>
          <h1 className="cal-title">みかん狩り 空き状況</h1>
        </div>
      </header>

      <div className="cal-body">
        {isDemo && (
          <div className="cal-demo-banner">
            ⚠️ デモ表示です。実際の空き状況とは異なります。
          </div>
        )}

        <div className="cal-month-nav">
          <button onClick={prevMonth} className="cal-nav-btn" aria-label="前の月">‹</button>
          <span className="cal-month-label">{year}年{month + 1}月</span>
          <button onClick={nextMonth} className="cal-nav-btn" aria-label="次の月">›</button>
        </div>

        <div className="cal-legend">
          <span><span className="dot open" />空きあり</span>
          <span><span className="dot full" />満員</span>
          <span><span className="dot none" />休園日</span>
        </div>

        {loading ? (
          <div className="cal-loading">
            <div className="cal-spinner" />
            <p>読み込み中…</p>
          </div>
        ) : (
          <div className="cal-grid">
            {WEEKDAYS.map((d, i) => (
              <div
                key={d}
                className={`cal-weekday-label ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}
              >
                {d}
              </div>
            ))}

            {cells.map((day, idx) => {
              if (!day) return <div key={`e${idx}`} className="cal-cell empty" />

              const dow     = idx % 7
              const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
              const todayY  = today.getFullYear()
              const todayM  = today.getMonth()
              const todayD  = today.getDate()
              const isPast  = new Date(year, month, day) < new Date(todayY, todayM, todayD)
              const isToday = year === todayY && month === todayM && day === todayD
              const slots   = avail[dateStr]

              return (
                <div
                  key={day}
                  className={[
                    'cal-cell',
                    isPast  ? 'past'  : '',
                    isToday ? 'today' : '',
                    slots   ? 'has-event' : '',
                  ].join(' ')}
                >
                  <span className={`cal-day-num ${dow === 0 ? 'sun' : dow === 6 ? 'sat' : ''}`}>
                    {day}
                  </span>

                  {!isPast && slots && (
                    <div className="cal-slots">
                      <div className={`cal-slot ${slots.am || 'none'}`}>
                        <span className="slot-label">前</span>
                        <span className="slot-mark">
                          {slots.am === 'open' ? '○' : slots.am === 'full' ? '×' : '—'}
                        </span>
                      </div>
                      <div className={`cal-slot ${slots.pm || 'none'}`}>
                        <span className="slot-label">後</span>
                        <span className="slot-mark">
                          {slots.pm === 'open' ? '○' : slots.pm === 'full' ? '×' : '—'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="cal-cta">
          <a href={LINE_ACCOUNT_URL} className="cal-btn cal-btn-line">
            <LineIcon />
            LINEで予約する
            <span className="cal-btn-badge">おすすめ</span>
          </a>
          <p className="cal-btn-sub">予約後のキャンセル・当日連絡がスムーズ</p>
          <Link to="/reserve" className="cal-link-web">Webフォームで予約する</Link>
          <Link to="/" className="cal-link-back">← HPに戻る</Link>
        </div>

        <p className="cal-note">
          ご予約・お問い合わせはLINEアプリで受け付けています。
        </p>
      </div>
    </div>
  )
}

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 3C8.82 3 3 7.92 3 14c0 5.07 4.35 9.35 10.35 10.7l.65.14v3.64l3.58-2.69.46-.04C24.93 25 29 20.27 29 14 29 7.92 23.18 3 16 3z"/>
    </svg>
  )
}

function generateDemoData(y, m) {
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const map = {}
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(y, m, d).getDay()
    if (dow === 0 || dow === 6) {
      const key = `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      const r = Math.random()
      map[key] = {
        am: r < 0.2 ? 'full' : 'open',
        pm: r < 0.4 ? 'full' : 'open',
      }
    }
  }
  return map
}
