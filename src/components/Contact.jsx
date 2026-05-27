export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
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
              <span className="contact-info-value">沖縄県国頭郡今帰仁村字諸志</span>
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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
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

          <button type="submit" className="btn-submit">
            送信する <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}
