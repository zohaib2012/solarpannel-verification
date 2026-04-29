import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Admin.css'

const API = '/api/panels'

const COUNTRIES = [
  'Pakistan', 'India', 'Bangladesh', 'UAE', 'Saudi Arabia',
  'Turkey', 'Egypt', 'Nigeria', 'South Africa', 'USA',
  'Germany', 'UK', 'Australia', 'China', 'Other'
]

const emptyForm = { serial_number: '', panel_type: '', country: '' }

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
})

export default function Admin() {
  const navigate = useNavigate()
  const [panels, setPanels]   = useState([])
  const [form, setForm]       = useState(emptyForm)
  const [editId, setEditId]   = useState(null)
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const fetchPanels = async () => {
    try {
      const { data } = await axios.get(API, authHeader())
      setPanels(data)
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
      }
    }
  }

  useEffect(() => { fetchPanels() }, [])

  const notify = (msg, isError = false) => {
    if (isError) setError(msg); else setSuccess(msg)
    setTimeout(() => { setError(''); setSuccess('') }, 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.serial_number.trim()) return notify('Serial number is required.', true)
    setLoading(true)
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form, authHeader())
        notify('Panel updated successfully.')
      } else {
        await axios.post(API, form, authHeader())
        notify('Panel added successfully.')
      }
      setForm(emptyForm)
      setEditId(null)
      fetchPanels()
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
      } else {
        notify(err.response?.data?.error || 'Something went wrong.', true)
      }
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (panel) => {
    setEditId(panel.id)
    setForm({ serial_number: panel.serial_number, panel_type: panel.panel_type || '', country: panel.country || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => { setEditId(null); setForm(emptyForm) }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this panel?')) return
    try {
      await axios.delete(`${API}/${id}`, authHeader())
      notify('Panel deleted.')
      fetchPanels()
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
      }
    }
  }

  const filtered = panels.filter(p =>
    p.serial_number.toLowerCase().includes(search.toLowerCase()) ||
    (p.panel_type || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.country || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-logo">
          <span className="logo-jinko">JinKO</span><span className="logo-solar">Solar</span>
        </div>
        <h1>Admin Panel</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-body">
        {/* Form */}
        <div className="admin-form-card">
          <h2>{editId ? 'Edit Panel' : 'Add New Panel'}</h2>
          {error   && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Serial Number *</label>
              <input
                type="text"
                value={form.serial_number}
                onChange={e => setForm({ ...form, serial_number: e.target.value })}
                placeholder="e.g. 63FX7B24C271901571606798"
              />
            </div>
            <div className="form-group">
              <label>Panel Type</label>
              <input
                type="text"
                value={form.panel_type}
                onChange={e => setForm({ ...form, panel_type: e.target.value })}
                placeholder="e.g. JKM585N-72HL4-V"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                <option value="">— Select Country —</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-add" disabled={loading}>
                {loading ? 'Saving...' : editId ? 'Update Panel' : 'Add Panel'}
              </button>
              {editId && <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>}
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="admin-table-card">
          <div className="table-header">
            <h2>All Panels ({panels.length})</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Search by SN, type or country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Serial Number</th>
                  <th>Panel Type</th>
                  <th>Country</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="empty-row">No panels found.</td></tr>
                ) : (
                  filtered.map((p, i) => (
                    <tr key={p.id} className={editId === p.id ? 'editing-row' : ''}>
                      <td>{i + 1}</td>
                      <td className="sn-cell">{p.serial_number}</td>
                      <td>{p.panel_type || '—'}</td>
                      <td>{p.country || '—'}</td>
                      <td>{new Date(p.created_at).toLocaleDateString()}</td>
                      <td>
                        <button className="btn-edit" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
