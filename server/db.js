const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const initDB = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS solar_panels (
      id SERIAL PRIMARY KEY,
      serial_number VARCHAR(150) UNIQUE NOT NULL,
      panel_type VARCHAR(150),
      country VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  console.log('Database initialized');
};

module.exports = { sql, initDB };
