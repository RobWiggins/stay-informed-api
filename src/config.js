require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  OPEN_SECRETS_BASE_URL: 'http://www.opensecrets.org/api/?',
  DB_URL: process.env.DATABASE_URL || 'postgresql://dunder-mifflin@localhost/stay-informed',
  OPEN_SECRETS_API_KEY: process.env.OPEN_SECRETS_API_KEY || 'none_found',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '365d', /* TODO revisit expiry time */
  // TODO REMOVE obsolete API keys that are not used anymore
  PROPUBLICA_API_KEY: process.env.PROPUBLICA_API_KEY || 'null key',
  CIVIC_API_KEY: process.env.CIVIC_API_KEY,
  CIVIC_API_URL: process.env.CIVIC_API_URL || 'https://www.googleapis.com/civicinfo/v2/representatives',
  GEOCODE_API_URL: process.env.GEOCODE_API_URL || 'https://api.geocod.io/v1.7/geocode',
  GEOCODE_REPRESENTATIVE_LOOKUP_KEY: process.env.GEOCODE_REPRESENTATIVE_LOOKUP_KEY,
};
