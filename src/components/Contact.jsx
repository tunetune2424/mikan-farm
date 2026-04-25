import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' }

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(STATUS.IDLE)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(STATUS.SENDING)

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setStatus(STATUS.SUCCESS)
      formRef.current.reset()
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <p className="section-label">Contact</p>
          <h2 className="section-title serif">お問い合わせ</h2>
          <p>ご注文・ご質問はお気軽にお問い合わせください。2営業日以内にご返信いたします。</p>
          <div className="contact-info">
            <div className="contact-info-item">
              <span className="contact-info-label">Location</span>
              <span className="contact-info-value">沖縄県国頭郡本部町伊豆味</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Email</span>
              <span className="contact-info-value">info@isa-mikan.jp</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-label">Hours</span>
              <span className="contact-info-value">9:00〜17:00</span>
            </div>
          </div>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="contact-name">お名前</label>
            <input
              id="contact-name"
              type="text"
              name="from_name"
              placeholder="山田 太郎"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">メールアドレス</label>
            <input
              id="contact-email"
              type="email"
              name="reply_to"
              placeholder="your@email.com"
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
              required
            />
          </div>

          {status === STATUS.SUCCESS && (
            <p className="form-feedback form-feedback--success">
              送信しました。2営業日以内にご返信いたします。
            </p>
          )}
          {status === STATUS.ERROR && (
            <p className="form-feedback form-feedback--error">
              送信に失敗しました。時間をおいて再度お試しください。
            </p>
          )}

          <button
            type="submit"
            className="btn-submit"
            disabled={status === STATUS.SENDING}
          >
            {status === STATUS.SENDING ? '送信中...' : <>送信する <span className="arrow">→</span></>}
          </button>
        </form>
      </div>
    </section>
  )
}
