import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Navbar.css'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGS.find(l => l.code === lang)

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-zen">Zen</span>
        <span className="logo-solar-text">Solar</span>
      </Link>
      <div className="nav-right" ref={ref}>
        <button className="lang-btn" onClick={() => setOpen(v => !v)}>
          <span className="globe-icon">🌐</span>
          <span className="lang">{current.label}</span>
          <span className="lang-arrow">{open ? '▴' : '▾'}</span>
        </button>
        {open && (
          <div className="lang-dropdown">
            {LANGS.map(l => (
              <button
                key={l.code}
                className={`lang-option${lang === l.code ? ' active' : ''}`}
                onClick={() => { setLang(l.code); setOpen(false) }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
