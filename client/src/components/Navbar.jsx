import { Link } from 'react-router-dom'
import './Navbar.css'

const LOGO = 'https://cs-jinkosolar.com/assets/frontend/images/jinko-solar-logo-full.svg'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={LOGO} alt="JinkoSolar" className="nav-logo-img" />
      </Link>
      <div className="nav-right">
        <span className="globe-icon">🌐</span>
        <span className="lang">English</span>
        <span className="lang-arrow">▾</span>
      </div>
    </nav>
  )
}
