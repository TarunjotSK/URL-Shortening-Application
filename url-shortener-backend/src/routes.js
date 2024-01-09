const { body, validationResult } = require('express-validator');
const he = require('he');
const shortid = require('shortid');

const shortenURL = (pool, setCache) => {
  return [
    body('url').isURL().withMessage('Invalid URL format').trim().escape(),
    async (req, res) => {
      // Input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Generate a short URL ID
      const { url } = req.body;
      const shortUrlId = shortid.generate();

      try {
        // Insert into the database
        const result = await pool.query(
          'INSERT INTO urls (short_url, original_url) VALUES ($1, $2) RETURNING *',
          [shortUrlId, url]
        );

        // Set the URL mapping in the Redis cache
        await setCache(shortUrlId, url);

        // Return the result
        result.rows[0]['original_url'] = he.decode(url);
        res.json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  ];
};

const redirectURL = (pool, getCache) => {
  return async (req, res) => {
    const { shortUrlId } = req.params;

    try {
      // Attempt to retrieve the original URL from the cache
      let cachedUrl = await getCache(shortUrlId);
      console.log('cachedUrl:', cachedUrl);
      cachedUrl = he.decode(cachedUrl);

      // Redirect to the cached URL if it exists
      if (cachedUrl) {
        return res.redirect(cachedUrl);
      }

      // Query the database for the original URL
      const result = await pool.query(
        'SELECT original_url FROM urls WHERE short_url = $1',
        [shortUrlId]
      );

      // Redirect to the original URL or send a 404 if not found
      if (result.rows.length > 0) {
        const { original_url } = he.decode(result.rows[0]);
        console.log('original_url:', original_url);
        await setCache(shortUrlId, original_url);
        return res.redirect(original_url);
      } else {
        return res.status(404).send('Not found');
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { shortenURL, redirectURL };
