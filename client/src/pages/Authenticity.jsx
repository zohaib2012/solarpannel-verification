import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useLang } from '../context/LanguageContext'
import './Authenticity.css'
import API_BASE from '../utils/api'

const HERO_IMG    = 'https://cs-jinkosolar.com/assets/frontend/images/authenticity-banner.svg'
const BARCODE_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/solar-verification.jpg'

const COUNTRIES = [
  'Pakistan', 'India', 'Bangladesh', 'UAE', 'Saudi Arabia',
  'Turkey', 'Egypt', 'Nigeria', 'South Africa', 'USA',
  'Germany', 'UK', 'Australia', 'China', 'Other'
]

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function Authenticity() {
  const { t } = useLang()
  const [country, setCountry]           = useState('')
  const [sn, setSn]                     = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha]                       = useState(generateCaptcha)
  const [result, setResult]             = useState(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!country) return setError(t('auth_err_country'))
    if (!sn.trim()) return setError(t('auth_err_sn'))
    if (captchaInput.toUpperCase() !== captcha) return setError(t('auth_err_captcha'))

    try {
      setLoading(true)
      const { data } = await axios.post(`${API_BASE}/api/verify`, { serial_number: sn })
      setResult(data)
    } catch {
      setError(t('auth_err_server'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Navbar />

      {/* Hero */}
      <div className="auth-hero" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <h1>{t('auth_hero')}</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Main Card */}
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-intro">{t('auth_intro')}</p>

          <img src={BARCODE_IMG} alt="Product barcode" className="barcode-img" />

          {result === null ? (
            <form onSubmit={handleVerify} className="auth-form">
              <label>{t('auth_select_country')}</label>
              <select value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">{t('auth_select_placeholder')}</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <input
                type="text"
                placeholder={t('auth_sn_placeholder')}
                value={sn}
                onChange={e => setSn(e.target.value)}
              />

              <div className="captcha-row">
                <input
                  type="text"
                  placeholder={t('auth_captcha_placeholder')}
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value)}
                  maxLength={5}
                />
                <span className="captcha-text">{captcha}</span>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="verify-btn" disabled={loading}>
                {loading ? t('auth_verifying') : t('auth_verify_btn')}
              </button>
            </form>
          ) : (
            <div className="result-card">
              <div className={`result-badge ${result.verified ? 'verified' : 'unverified'}`}>
                {result.verified ? t('auth_verified') : t('auth_unverified')}
              </div>

              {result.verified ? (
                <>
                  <p className="result-note">
                    {t('auth_result_note', { country: result.panel.country || 'your region' })}
                  </p>
                  <div className="result-table">
                    <div className="result-row">
                      <span>{t('auth_country_label')}</span><span>{result.panel.country || '—'}</span>
                    </div>
                    <div className="result-row">
                      <span>{t('auth_code_label')}</span><span>{result.panel.serial_number}</span>
                    </div>
                    <div className="result-row">
                      <span>{t('auth_type_label')}</span><span>{result.panel.panel_type || '—'}</span>
                    </div>
                    <div className="result-row">
                      <span>{t('auth_cert_label')}</span><span className="cert-ok">{t('auth_cert_value')}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="result-note unverified-note">{t('auth_counterfeit')}</p>
              )}

              <button className="verify-btn" onClick={() => { setResult(null); setSn(''); setCaptchaInput(''); setCountry(''); setError('') }}>
                {t('auth_back')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
