import { useState } from 'react'
import emailjs from '@emailjs/browser'

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

const MAP_QUERY = encodeURIComponent('沖縄県国頭郡今帰仁村字諸志')

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('done')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-head fade-up">
          <p className="section-label">Contact</p>
          <h2 className="contact-headline serif">
            ご注文・ご質問は<br />お気軽に。
          </h2>
        </div>

        <div className="contact-grid">
          {status === 'done' ? (
            <div className="contact-success">
              <div className="check" aria-hidden="true">✓</div>
              <h3>送信しました</h3>
              <p>お問い合わせありがとうございます。2営業日以内にご返信いたします。</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {status === 'error' && (
                <p className="form-feedback form-feedback--error">
                  送信に失敗しました。しばらく経ってからもう一度お試しいただくか、メールにて直接お問い合わせください。
                </p>
              )}
              <div className="field">
                <label htmlFor="contact-name">お名前</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="山田 太郎"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">メールアドレス</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="contact-message">メッセージ</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="ご注文内容・ご質問など"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                {status === 'sending' ? '送信中…' : '送信する'} <span className="arrow">→</span>
              </button>
            </form>
          )}

          <div className="contact-side fade-up" style={{ transitionDelay: '0.15s' }}>
            <p className="contact-side-desc">
              2営業日以内にご返信いたします。お急ぎの場合はメールにてお問い合わせください。
            </p>
            <div className="contact-info">
              <div className="contact-info-item">
                <span className="contact-info-label">Location</span>
                <span className="contact-info-value">沖縄県国頭郡今帰仁村字諸志</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">Email</span>
                <span className="contact-info-value">info@isa-mikan.jp</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">Hours</span>
                <span className="contact-info-value">平日 9:00〜17:00</span>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                title="伊佐みかん園の地図"
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=13&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
