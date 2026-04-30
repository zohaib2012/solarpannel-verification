import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useLang } from '../context/LanguageContext'
import './Home.css'

const HERO_IMG  = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const CARD1_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t('hero_service')}</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Solutions */}
      <section className="solutions-section">
        <div className="section-title-row">
          <span className="title-dash" />
          <h2>{t('solutions')}</h2>
          <span className="title-dash" />
        </div>

        <div className="solution-cards">
          <div className="sol-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>{t('new_claim_title')}</h3>
              <p>{t('new_claim_desc')}</p>
              <button onClick={() => navigate('/new-claim')}>{t('new_claim_btn')}</button>
            </div>
          </div>

          <div className="sol-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>{t('claim_summary_title')}</h3>
              <p>{t('claim_summary_desc')}</p>
              <button onClick={() => navigate('/claim-summary')}>{t('claim_summary_btn')}</button>
            </div>
          </div>

          <div className="sol-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>{t('sn_auth_title')}</h3>
              <p>{t('sn_auth_desc')}</p>
              <button onClick={() => navigate('/authenticity')}>{t('sn_auth_btn')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
