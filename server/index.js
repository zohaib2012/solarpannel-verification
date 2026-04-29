const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sql, initDB } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

initDB().catch(console.error);

// ── Auth middleware ───────────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    req.admin = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ── Admin Login ───────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid email or password' });
});

// ── Public: Verify serial number ──────────────────────────────────────────────
app.post('/api/verify', async (req, res) => {
  const { serial_number } = req.body;
  if (!serial_number) return res.status(400).json({ error: 'Serial number required' });

  const rows = await sql`
    SELECT * FROM solar_panels WHERE LOWER(serial_number) = LOWER(${serial_number.trim()})
  `;

  if (rows.length > 0) {
    res.json({ verified: true, panel: rows[0] });
  } else {
    res.json({ verified: false });
  }
});

// ── Admin: Get all panels (protected) ────────────────────────────────────────
app.get('/api/panels', requireAuth, async (req, res) => {
  const rows = await sql`SELECT * FROM solar_panels ORDER BY created_at DESC`;
  res.json(rows);
});

// ── Admin: Add panel (protected) ──────────────────────────────────────────────
app.post('/api/panels', requireAuth, async (req, res) => {
  const { serial_number, panel_type, country } = req.body;
  if (!serial_number) return res.status(400).json({ error: 'Serial number required' });

  try {
    const rows = await sql`
      INSERT INTO solar_panels (serial_number, panel_type, country)
      VALUES (${serial_number.trim()}, ${panel_type || ''}, ${country || ''})
      RETURNING *
    `;
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.message.includes('unique')) {
      res.status(409).json({ error: 'Serial number already exists' });
    } else {
      res.status(500).json({ error: e.message });
    }
  }
});

// ── Admin: Update panel (protected) ──────────────────────────────────────────
app.put('/api/panels/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { serial_number, panel_type, country } = req.body;

  try {
    const rows = await sql`
      UPDATE solar_panels
      SET serial_number = ${serial_number.trim()},
          panel_type    = ${panel_type || ''},
          country       = ${country || ''}
      WHERE id = ${id}
      RETURNING *
    `;
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Admin: Delete panel (protected) ──────────────────────────────────────────
app.delete('/api/panels/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await sql`DELETE FROM solar_panels WHERE id = ${id}`;
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
