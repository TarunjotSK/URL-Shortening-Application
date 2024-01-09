const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { pool } = require('./db');
const { getCache, setCache } = require('./cache');
const { shortenURL, redirectURL } = require('./routes');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100
});
app.use(limiter);

app.post('/shorten', shortenURL(pool, setCache));
app.get('/:shortUrlId', redirectURL(pool, getCache));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
