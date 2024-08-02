const { Pool } = require('pg');

// Ensure the pool is correctly configured for both production and development environments
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
    } : undefined
});

module.exports = async (req, res) => {
    const { name, url } = req.body;

    // Basic input validation
    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Invalid or missing name' });
    }

    if (!url || typeof url !== 'string' || !url.trim()) {
        return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    try {
        // Attempt to insert the new name and URL into the database
        const result = await pool.query(
            'INSERT INTO queue_items (name, url) VALUES ($1, $2) RETURNING *',
            [name.trim(), url.trim()]
        );

        // Check if the insert operation was successful
        if (result.rows.length) {
            res.status(200).json({ message: 'Entry created successfully', entry: result.rows[0] });
        } else {
            // This case might not be necessary since an insert failure should throw an error
            throw new Error('No entry was created');
        }
    } catch (err) {
        console.error('Error creating entry:', err);

        // Handle specific error codes (e.g., unique constraint violation)
        if (err.code === '23505') {
            res.status(409).json({ error: 'Entry already exists' });
        } else {
            // Avoid sending detailed error messages in production environments
            const errorMessage = process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message;
            res.status(500).json({ error: 'Error creating entry', details: errorMessage });
        }
    }
};