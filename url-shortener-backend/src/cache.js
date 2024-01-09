const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

async function getCache(key) {
  return await redisClient.get(key);
}

async function setCache(key, value) {
  await redisClient.set(key, value, 'EX', 60 * 60 * 24); // Cache for 24 hours
}

module.exports = { getCache, setCache };
