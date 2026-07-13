import { useState } from 'react'

const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || ''
const STORAGE_KEY = 'mikan-farm-authed'

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(
    () => !SITE_PASSWORD || sessionStorage.getItem(STORAGE_KEY) === 'true'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (authed) return children

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="password-gate">
      <form onSubmit={handleSubmit} className="password-gate-card">
        <h1 className="password-gate-title serif">伊佐みかん園</h1>
        <p className="password-gate-desc">
          このサイトは現在公開準備中です。パスワードを入力してください。
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(false)
          }}
          autoFocus
          className="password-gate-input"
          placeholder="パスワード"
        />
        {error && <p className="password-gate-error">パスワードが違います</p>}
        <button type="submit" className="password-gate-submit">
          入る
        </button>
      </form>
    </div>
  )
}
