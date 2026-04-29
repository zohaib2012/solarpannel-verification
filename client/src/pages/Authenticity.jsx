import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
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
  const [country, setCountry]       = useState('')
  const [sn, setSn]                 = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha]                   = useState(generateCaptcha)
  const [result, setResult]         = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!country) return setError('Please select your country.')
    if (!sn.trim()) return setError('Please enter the serial number.')
    if (captchaInput.toUpperCase() !== captcha) return setError('Verification code is incorrect.')

    try {
      setLoading(true)
      const { data } = await axios.post(`${API_BASE}/api/verify`, { serial_number: sn })
      setResult(data)
    } catch {
      setError('Server error. Please try again.')
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
          <h1>SEARCH PRODUCT SN</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Main Card */}
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-intro">
            Dear users, you can identify the authenticity of the product by entering the module's serial number.
          </p>

          <img src={BARCODE_IMG} alt="Product barcode" className="barcode-img" />

          {result === null ? (
            <form onSubmit={handleVerify} className="auth-form">
              <label>Please Select Your Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">— Select Country —</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <input
                type="text"
                placeholder="Please scan or enter the SN"
                value={sn}
                onChange={e => setSn(e.target.value)}
              />

              <div className="captcha-row">
                <input
                  type="text"
                  placeholder="Please enter the verification code"
                  value={captchaInput}
                  onChange={e => setCaptchaInput(e.target.value)}
                  maxLength={5}
                />
                <span className="captcha-text">{captcha}</span>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="verify-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </form>
          ) : (
            <div className="result-card">
              <div className={`result-badge ${result.verified ? 'verified' : 'unverified'}`}>
                {result.verified ? '✓ Verified' : '✗ Not Verified'}
              </div>

              {result.verified ? (
                <>
                  <p className="result-note">
                    The product(s) in association with the serial number(s) you inquired about are eligible for Zen Solar's warranty and after-sales services only within {result.panel.country || 'your region'}. Beyond this area, the warranty and after-sales service will not be available.
                  </p>
                  <div className="result-table">
                    <div className="result-row">
                      <span>Country</span><span>{result.panel.country || '—'}</span>
                    </div>
                    <div className="result-row">
                      <span>Code</span><span>{result.panel.serial_number}</span>
                    </div>
                    <div className="result-row">
                      <span>Type</span><span>{result.panel.panel_type || '—'}</span>
                    </div>
                    <div className="result-row">
                      <span>Certification Result</span><span className="cert-ok">Zen Solar Product</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="result-note unverified-note">
                  This serial number was not found in our record. This product may be counterfeit or the serial number may be incorrect.
                </p>
              )}

              <button className="verify-btn" onClick={() => { setResult(null); setSn(''); setCaptchaInput(''); setCountry(''); setError('') }}>
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
