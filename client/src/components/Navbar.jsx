import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-jinko">JinKO</span>
        <span className="logo-solar">Solar</span>
      </Link>
      <div className="nav-right">
        <span className="globe-icon">🌐</span>
        <span className="lang">English</span>
        <span className="lang-arrow">▾</span>
      </div>
    </nav>
  )
}
