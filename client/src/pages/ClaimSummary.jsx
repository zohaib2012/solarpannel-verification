import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLang } from '../context/LanguageContext'
import './NewClaim.css'
import './ClaimSummary.css'

const HERO_IMG  = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const SOLAR_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-1.jfif'
const CARD1_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

export default function ClaimSummary() {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t('cs_hero')}</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Buy Original */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('cs_buy_original')}</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-text">
            <h3>{t('cs_check_auth')}</h3>
            <p>{t('cs_check_p1')}</p>
            <p>{t('cs_check_p2')}</p>
            <button className="btn-primary" onClick={() => navigate('/authenticity')}>{t('cs_check_sn_btn')}</button>
          </div>
          <div className="col-img">
            <img src={SOLAR_IMG} alt="Solar panels" />
          </div>
        </div>
      </section>

      {/* Why Original Products Matter */}
      <section className="cards-section grey-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('cs_why_original')}</h2><span className="title-dash" />
        </div>
        <div className="img-cards">
          <div className="img-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('cs_safety')}</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('cs_warranty')}</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('cs_efficiency')}</span>
          </div>
        </div>
      </section>

      {/* How to Verify */}
      <section className="verify-steps-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('cs_how_verify')}</h2><span className="title-dash" />
        </div>
        <div className="steps-row">
          <div className="step">
            <span className="step-num">1</span>
            <p>{t('cs_step1')}</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>{t('cs_step2')}</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <p>{t('cs_step3')}</p>
          </div>
          <div className="step">
            <span className="step-num">4</span>
            <p>{t('cs_step4')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section grey-bg">
        <h2>{t('cs_cta_title')}</h2>
        <p>{t('cs_cta_desc')}</p>
        <button className="btn-verify" onClick={() => navigate('/authenticity')}>{t('cs_verify_btn')}</button>
      </section>
    </div>
  )
}
