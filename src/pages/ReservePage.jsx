import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import liff from '@line/liff'
import './ReservePage.css'

const GAS_URL          = import.meta.env.VITE_GAS_URL          || ''
const LINE_ACCOUNT_URL = import.meta.env.VITE_LINE_ACCOUNT_URL || '#'
const PHONE            = import.meta.env.VITE_FARM_PHONE       || ''
const EMAIL            = import.meta.env.VITE_FARM_EMAIL       || ''
const GOOGLE_API_KEY   = import.meta.env.VITE_GOOGLE_API_KEY   || ''
const CALENDAR_ID      = import.meta.env.VITE_CALENDAR_ID      || ''
const LIFF_ID          = import.meta.env.VITE_LIFF_ID          || ''

const AM_TIMES = ['9:00', '10:00', '11:00']
const PM_TIMES = ['13:00', '14:00', '15:00', '16:00']
const TOTAL_STEPS = 5

const today = new Date()
const todayStr = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-')

async function fetchAvailForMonth(y, m) {
  if (!GOOGLE_API_KEY || !CALENDAR_ID) return {}
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
    const t = (ev.summary || '').replace(/[\s　]/g, '')
    const full = t.includes('満員')
    if (t.includes('午前')) map[d].am = full ? 'full' : 'open'
    if (t.includes('午後')) map[d].pm = full ? 'full' : 'open'
  })
  return map
}

export default function ReservePage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    date: '',
    timeSlot: '',
    arrivalTime: '',
    adults: 2,
    children: 0,
    name: '',
    tel: '',
    email: '',
  })
  const [avail, setAvail] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [liffUserId, setLiffUserId] = useState('')

  useEffect(() => {
    if (!LIFF_ID) return
    liff.init({ liffId: LIFF_ID })
      .then(() => {
        if (liff.isLoggedIn()) return liff.getProfile()
      })
      .then(profile => {
        if (profile) setLiffUserId(profile.userId)
      })
      .catch(err => console.error('LIFF init error:', err))
  }, [])

  useEffect(() => {
    const t = new Date()
    fetchAvailForMonth(t.getFullYear(), t.getMonth()).then(setAvail)
    const next = new Date(t.getFullYear(), t.getMonth() + 1, 1)
    fetchAvailForMonth(next.getFullYear(), next.getMonth()).then(m =>
      setAvail(prev => ({ ...prev, ...m }))
    )
  }, [])

  const dateSlots = avail[form.date] || null
  const times = form.timeSlot === '午前' ? AM_TIMES : PM_TIMES

  function next() { setError(''); setStep(s => s + 1) }
  function back() { setError(''); setStep(s => s - 1) }

  function handleDateNext() {
    if (GOOGLE_API_KEY && !dateSlots) {
      setError('選択した日はみかん狩りをご利用いただけません。空き状況ページでご確認ください。')
      return
    }
    next()
  }

  function validateStep5() {
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError('お名前を正しく入力してください')
      return false
    }
    const telClean = form.tel.replace(/[ー\-\s]/g, '')
    if (!/^0\d{9,10}$/.test(telClean)) {
      setError('電話番号を正しく入力してください（例：090-1234-5678）')
      return false
    }
    if (!form.email.trim()) {
      setError('メールアドレスを入力してください')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('メールアドレスの形式が正しくありません')
      return false
    }
    return true
  }

  async function handleSubmit() {
    if (!validateStep5()) return
    if (!GAS_URL) {
      setDone(true)
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const isLiff = LIFF_ID && liff.isInClient && liff.isInClient()
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          source: isLiff && liffUserId ? 'liff' : 'web',
          userId: liffUserId || undefined,
          date: form.date,
          timeSlot: form.timeSlot,
          arrivalTime: form.arrivalTime,
          adults: form.adults,
          children: form.children,
          name: form.name,
          tel: form.tel,
          email: form.email,
        }),
      })
      setDone(true)
    } catch {
      setError('送信に失敗しました。しばらく経ってからもう一度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return <CompletePage lineUrl={LINE_ACCOUNT_URL} phone={PHONE} email={EMAIL} />
  }

  return (
    <div className="res-page">
      <header className="res-header">
        <Link to="/calendar" className="res-back">← 空き状況に戻る</Link>
        <div className="res-title-wrap">
          <span className="res-emoji">🍊</span>
          <h1 className="res-title">みかん狩り 予約フォーム</h1>
        </div>
      </header>

      <div className="res-body">
        <div className="res-steps" aria-label={`ステップ ${step} / ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`res-step-dot ${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'current' : ''}`}
            />
          ))}
        </div>
        <p className="res-step-label">STEP {step} / {TOTAL_STEPS}</p>

        {step === 1 && (
          <div className="res-step-body">
            <h2 className="res-step-title">日付を選んでください</h2>
            <p className="res-step-hint">
              <Link to="/calendar">空き状況ページ</Link>で開園日をご確認の上、選択してください
            </p>
            <input
              type="date"
              className="res-date-input"
              value={form.date}
              min={todayStr}
              onChange={e => setForm(f => ({ ...f, date: e.target.value, timeSlot: '', arrivalTime: '' }))}
            />
            {form.date && GOOGLE_API_KEY && !dateSlots && (
              <p className="res-date-warn">
                この日は開園日ではありません。別の日を選んでください。
              </p>
            )}
            <button
              className="res-btn"
              disabled={!form.date || (!!GOOGLE_API_KEY && !dateSlots)}
              onClick={handleDateNext}
            >
              次へ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="res-step-body">
            <h2 className="res-step-title">時間帯を選んでください</h2>
            <p className="res-step-date">{formatDate(form.date)}</p>
            <div className="res-radio-group">
              {['午前', '午後'].map(slot => {
                const key = slot === '午前' ? 'am' : 'pm'
                const unavailable = dateSlots && dateSlots[key] === null
                return (
                  <label
                    key={slot}
                    className={`res-radio-label ${form.timeSlot === slot ? 'selected' : ''} ${unavailable ? 'disabled' : ''}`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={form.timeSlot === slot}
                      disabled={unavailable}
                      onChange={() => setForm(f => ({ ...f, timeSlot: slot, arrivalTime: '' }))}
                    />
                    <span className="res-radio-text">
                      {slot}
                      <span className="res-radio-sub">
                        {slot === '午前' ? '9:00〜12:00' : '13:00〜17:00'}
                      </span>
                      {unavailable && <span className="res-radio-unavail">受付なし</span>}
                    </span>
                  </label>
                )
              })}
            </div>
            <div className="res-btn-row">
              <button className="res-btn-back" onClick={back}>戻る</button>
              <button className="res-btn" disabled={!form.timeSlot} onClick={next}>次へ</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="res-step-body">
            <h2 className="res-step-title">来園時間を選んでください</h2>
            <p className="res-step-date">{formatDate(form.date)}　{form.timeSlot}</p>
            <div className="res-time-group">
              {times.map(t => (
                <label
                  key={t}
                  className={`res-time-label ${form.arrivalTime === t ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="arrivalTime"
                    value={t}
                    checked={form.arrivalTime === t}
                    onChange={() => setForm(f => ({ ...f, arrivalTime: t }))}
                  />
                  {t}
                </label>
              ))}
            </div>
            <div className="res-btn-row">
              <button className="res-btn-back" onClick={back}>戻る</button>
              <button className="res-btn" disabled={!form.arrivalTime} onClick={next}>次へ</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="res-step-body">
            <h2 className="res-step-title">人数を入力してください</h2>
            <div className="res-count-list">
              <CountRow
                label="大人"
                sub="中学生以上"
                value={form.adults}
                min={1}
                onChange={v => setForm(f => ({ ...f, adults: v }))}
              />
              <CountRow
                label="子ども"
                sub="小学生以下"
                value={form.children}
                min={0}
                onChange={v => setForm(f => ({ ...f, children: v }))}
              />
            </div>
            <p className="res-count-total">合計 {form.adults + form.children} 名</p>
            <div className="res-btn-row">
              <button className="res-btn-back" onClick={back}>戻る</button>
              <button className="res-btn" onClick={next}>次へ</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="res-step-body">
            <h2 className="res-step-title">連絡先を入力してください</h2>
            <div className="res-form-list">
              <label className="res-field">
                <span className="res-field-label">
                  お名前 <span className="res-required">必須</span>
                </span>
                <input
                  type="text"
                  className="res-input"
                  placeholder="田中 太郎"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </label>
              <label className="res-field">
                <span className="res-field-label">
                  電話番号 <span className="res-required">必須</span>
                </span>
                <input
                  type="tel"
                  className="res-input"
                  placeholder="090-0000-0000"
                  value={form.tel}
                  onChange={e => setForm(f => ({ ...f, tel: e.target.value }))}
                />
              </label>
              <label className="res-field">
                <span className="res-field-label">
                  メールアドレス <span className="res-required">必須</span>
                </span>
                <p className="res-field-note">予約確認・連絡先として使用します</p>
                <input
                  type="email"
                  className="res-input"
                  placeholder="example@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </label>
            </div>
            <div className="res-summary">
              <p>📅 {formatDate(form.date)}　{form.timeSlot}　{form.arrivalTime}〜</p>
              <p>👥 大人 {form.adults}名・子ども {form.children}名</p>
            </div>
            {error && <p className="res-error">{error}</p>}
            <div className="res-btn-row">
              <button className="res-btn-back" onClick={back}>戻る</button>
              <button
                className="res-btn res-btn-submit"
                disabled={!form.name || !form.tel || !form.email || submitting}
                onClick={handleSubmit}
              >
                {submitting ? '送信中…' : '予約を確定する'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CountRow({ label, sub, value, min, onChange }) {
  return (
    <div className="res-count-row">
      <div className="res-count-info">
        <span className="res-count-label">{label}</span>
        <span className="res-count-sub">{sub}</span>
      </div>
      <div className="res-count-ctrl">
        <button
          className="res-count-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`${label}を減らす`}
        >
          ー
        </button>
        <span className="res-count-val">{value}</span>
        <button
          className="res-count-btn"
          onClick={() => onChange(value + 1)}
          aria-label={`${label}を増やす`}
        >
          ＋
        </button>
      </div>
    </div>
  )
}

function CompletePage({ lineUrl, phone, email }) {
  return (
    <div className="res-page">
      <header className="res-header">
        <Link to="/" className="res-back">← HPに戻る</Link>
        <div className="res-title-wrap">
          <span className="res-emoji">🍊</span>
          <h1 className="res-title">伊佐みかん園</h1>
        </div>
      </header>
      <div className="res-body">
        <div className="res-complete">
          <div className="res-complete-icon">✅</div>
          <h2 className="res-complete-title">ご予約を受け付けました</h2>
          <p className="res-complete-sub">当日お気をつけてお越しください🍊</p>
        </div>

        <div className="res-line-card">
          <p className="res-line-card-title">
            <span className="res-line-icon-wrap"><LineIcon /></span>
            LINEでもっと便利に
          </p>
          <p className="res-line-card-note">友達追加は無料・任意です</p>
          <ul className="res-line-benefits">
            <li>キャンセル・変更がかんたん</li>
            <li>農園の最新情報をお届け</li>
            <li>当日の連絡もスムーズ</li>
            <li>気軽に問い合わせできる</li>
          </ul>
          <a href={lineUrl} className="res-line-add-btn">
            <LineIcon /> 友達追加する
          </a>
        </div>

        {(phone || email) && (
          <div className="res-contact-info">
            <p className="res-contact-title">電話・メールでのお問い合わせ</p>
            {phone && <p className="res-contact-item">📞 {phone}</p>}
            {email && <p className="res-contact-item">📧 {email}</p>}
          </div>
        )}
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

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}
