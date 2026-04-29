import Navbar from '../components/Navbar'
import './NewClaim.css'

const HERO_IMG    = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const SOLAR_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-1.jfif'
const INSTALL_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-2.jpeg'
const CARD1_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

export default function NewClaim() {
  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>New Claim</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Why Solar Energy */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>WHY SOLAR ENERGY?</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-text">
            <h3>Power Your Future With Solar</h3>
            <p>Solar energy is one of the most reliable and sustainable power sources available today. By converting sunlight into electricity, solar panels provide clean, renewable energy for homes and businesses.</p>
            <p>Switching to solar helps reduce electricity bills, protects the environment, and increases property value. It is a long-term investment that delivers energy independence and cost savings.</p>
          </div>
          <div className="col-img">
            <img src={SOLAR_IMG} alt="Solar panels" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="cards-section grey-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>BENEFITS OF SOLAR PANELS</h2><span className="title-dash" />
        </div>
        <div className="img-cards">
          <div className="img-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="img-card-overlay" /><span>Lower Electricity Bills</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="img-card-overlay" /><span>Eco-Friendly Energy</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="img-card-overlay" /><span>Energy Independence</span>
          </div>
        </div>
      </section>

      {/* Green Energy Advantages */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>GREEN ENERGY ADVANTAGES</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-img">
            <img src={INSTALL_IMG} alt="Solar installation" />
          </div>
          <div className="col-text">
            <h3>Clean &amp; Sustainable Living</h3>
            <ul>
              <li>Renewable &amp; unlimited energy source</li>
              <li>Low maintenance and long lifespan</li>
              <li>Increases property resale value</li>
              <li>Government incentives &amp; tax benefits</li>
              <li>Reliable power during outages (with batteries)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
