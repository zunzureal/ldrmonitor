const { Pool } = require('pg');

// Create a new instance of the Pool class, which will be used to query the database.
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
  } : undefined
});

module.exports = async function handler(req, res) {
  try {
    // Use a client from the pool for each request
    const client = await pool.connect();
    try {
      const { rows } = await client.query('SELECT id, name, url FROM queue_items');
      res.status(200).json(rows);
    } catch (queryError) {
      console.error('Error executing query:', queryError.message);
      console.error('Stack Trace:', queryError.stack);
      res.status(500).json({ error: 'Error executing query', details: queryError.message });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (connectionError) {
    console.error('Error connecting to the database:', connectionError.message);
    console.error('Stack Trace:', connectionError.stack);
    res.status(500).json({ error: 'Error connecting to the database', details: connectionError.message });
  }
};