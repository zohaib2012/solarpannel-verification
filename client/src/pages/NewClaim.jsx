import Navbar from '../components/Navbar'
import { useLang } from '../context/LanguageContext'
import './NewClaim.css'

const HERO_IMG    = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const SOLAR_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-1.jfif'
const INSTALL_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-2.jpeg'
const CARD1_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

export default function NewClaim() {
  const { t } = useLang()

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{t('nc_hero')}</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Why Solar Energy */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('nc_why_solar')}</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-text">
            <h3>{t('nc_power_future')}</h3>
            <p>{t('nc_solar_p1')}</p>
            <p>{t('nc_solar_p2')}</p>
          </div>
          <div className="col-img">
            <img src={SOLAR_IMG} alt="Solar panels" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="cards-section grey-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('nc_benefits')}</h2><span className="title-dash" />
        </div>
        <div className="img-cards">
          <div className="img-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('nc_lower_bills')}</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('nc_eco_energy')}</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="img-card-overlay" /><span>{t('nc_energy_indep')}</span>
          </div>
        </div>
      </section>

      {/* Green Energy Advantages */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>{t('nc_green_adv')}</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-img">
            <img src={INSTALL_IMG} alt="Solar installation" />
          </div>
          <div className="col-text">
            <h3>{t('nc_clean_living')}</h3>
            <ul>
              <li>{t('nc_li1')}</li>
              <li>{t('nc_li2')}</li>
              <li>{t('nc_li3')}</li>
              <li>{t('nc_li4')}</li>
              <li>{t('nc_li5')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
