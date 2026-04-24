export default function Contact() {
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

        <form className="contact-form">
          <div className="field">
            <label>お名前</label>
            <input type="text" placeholder="山田 太郎" />
          </div>
          <div className="field">
            <label>メールアドレス</label>
            <input type="email" placeholder="your@email.com" />
          </div>
          <div className="field">
            <label>メッセージ</label>
            <textarea rows={5} placeholder="ご注文内容・ご質問など" />
          </div>
          <button type="submit" className="btn-submit">
            送信する <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}
