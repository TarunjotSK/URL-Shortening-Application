const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

const createUrlsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      short_url VARCHAR(255) NOT NULL,
      original_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table `urls` is ready.');
  } catch (error) {
    console.error('Error creating table `urls`:', error);
  }
};

// Call the function to ensure table creation
createUrlsTable();

module.exports = { pool };
