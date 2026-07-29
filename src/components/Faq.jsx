import { useState } from 'react'
import tankanImg from '../assets/tankan.jpeg'

const faqs = [
  { q: '注文してからどのくらいで届きますか？', a: '収穫後、即日発送しております。発送後は通常1〜2日程度でお手元に届きます。' },
  { q: '保存方法を教えてください。', a: '直射日光を避け、風通しの良い涼しい場所での保存をおすすめします。夏場は冷蔵庫での保存が安心です。' },
  { q: '熨斗（のし）は付けられますか？', a: '承っております。ご注文時の備考欄に、ご用途とご希望の表書きをご記入ください。' },
  { q: '大量注文は可能ですか？', a: '可能です。数量や時期によりご相談となりますので、お問い合わせフォームより事前にご連絡ください。' },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-list">
            <div className="faq-head fade-up">
              <p className="section-label">FAQ</p>
              <h2 className="section-title serif">よくあるご質問</h2>
            </div>

            {faqs.map((item, i) => {
              const open = openIndex === i
              return (
                <div key={item.q} className={`faq-item fade-up${open ? ' open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span>{item.q}</span>
                    <span className="faq-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  {open && <p className="faq-answer">{item.a}</p>}
                </div>
              )
            })}
          </div>

          <div className="faq-image fade-up">
            <img src={tankanImg} alt="収穫したタンカン" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
