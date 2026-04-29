import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './NewClaim.css'
import './ClaimSummary.css'

const HERO_IMG    = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const SOLAR_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-1.jfif'
const CARD1_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

// const SSTALL_IMG = 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80'
// const CAOLAR_IMG   = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80'
// const INRD4_IMG   = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-2.jpeg'

export default function ClaimSummary() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Claim<br />Summary</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Buy Original */}
      <section className="two-col-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>BUY ORIGINAL. STAY PROTECTED.</h2><span className="title-dash" />
        </div>
        <div className="two-col">
          <div className="col-text">
            <h3>Check Product Authenticity</h3>
            <p>Counterfeit solar products can reduce system performance, void warranties and cause safety risks. That's why every genuine product comes with a unique Serial Number (SN).</p>
            <p>You can instantly verify your product by entering the serial number in our authentication system.</p>
            <button className="btn-primary" onClick={() => navigate('/authenticity')}>Check Serial Number</button>
          </div>
          <div className="col-img">
            <img src={SOLAR_IMG} alt="Solar panels" />
          </div>
        </div>
      </section>

      {/* Why Original Products Matter */}
      <section className="cards-section grey-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>WHY ORIGINAL PRODUCTS MATTER</h2><span className="title-dash" />
        </div>
        <div className="img-cards">
          <div className="img-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="img-card-overlay" /><span>Safety Guaranteed</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="img-card-overlay" /><span>Valid Warranty</span>
          </div>
          <div className="img-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="img-card-overlay" /><span>Maximum Efficiency</span>
          </div>
        </div>
      </section>

      {/* How to Verify */}
      <section className="verify-steps-section white-bg">
        <div className="section-title-row">
          <span className="title-dash" /><h2>HOW TO VERIFY YOUR PRODUCT</h2><span className="title-dash" />
        </div>
        <div className="steps-row">
          <div className="step">
            <span className="step-num">1</span>
            <p>Find the Serial Number on your product.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>Open our SN Authentication page.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <p>Enter the serial number and submit.</p>
          </div>
          <div className="step">
            <span className="step-num">4</span>
            <p>Instantly see if your product is genuine.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section grey-bg">
        <h2>Verify Your Product Now</h2>
        <p>Protect your investment by confirming authenticity today.</p>
        <button className="btn-verify" onClick={() => navigate('/authenticity')}>Verify Serial</button>
      </section>
    </div>
  )
}
