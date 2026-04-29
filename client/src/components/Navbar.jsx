import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-zen">Zen</span>
        <span className="logo-solar-text">Solar</span>
      </Link>
      <div className="nav-right">
        <span className="globe-icon">🌐</span>
        <span className="lang">English</span>
        <span className="lang-arrow">▾</span>
      </div>
    </nav>
  )
}
