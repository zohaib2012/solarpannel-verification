import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

const HERO_IMG  = 'https://cs-jinkosolar.com/assets/frontend/images/banner.jpg'
const CARD1_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item1-DnYyuNq4.svg'
const CARD2_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item2-4OFDu8nx.svg'
const CARD3_IMG = 'https://cs-jinkosolar.com/assets/frontend/images/item3-m_Eu5sfO.svg'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero */}
      <div className="hero-banner" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>SERVICE AND SUPPORT</h1>
          <div className="hero-line" />
        </div>
      </div>

      {/* Solutions */}
      <section className="solutions-section">
        <div className="section-title-row">
          <span className="title-dash" />
          <h2>SOLUTIONS</h2>
          <span className="title-dash" />
        </div>

        <div className="solution-cards">
          <div className="sol-card" style={{ backgroundImage: `url(${CARD1_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>New Claim</h3>
              <p>Log in and submit a new aftersales claim</p>
              <button onClick={() => navigate('/new-claim')}>NEW CLAIM</button>
            </div>
          </div>

          <div className="sol-card" style={{ backgroundImage: `url(${CARD2_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>Claim Summary</h3>
              <p>Log in to check claim history and active claim progress</p>
              <button onClick={() => navigate('/claim-summary')}>CLAIM SUMMARY</button>
            </div>
          </div>

          <div className="sol-card" style={{ backgroundImage: `url(${CARD3_IMG})` }}>
            <div className="sol-overlay" />
            <div className="sol-content">
              <h3>SN Authentication</h3>
              <p>To verify the authenticity of a module by its serial number</p>
              <button onClick={() => navigate('/authenticity')}>SEARCH</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
