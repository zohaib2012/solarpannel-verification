import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewClaim from './pages/NewClaim'
import ClaimSummary from './pages/ClaimSummary'
import Authenticity from './pages/Authenticity'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-claim" element={<NewClaim />} />
      <Route path="/claim-summary" element={<ClaimSummary />} />
      <Route path="/authenticity" element={<Authenticity />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
