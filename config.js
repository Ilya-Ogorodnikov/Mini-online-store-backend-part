const PORT = process.env.PORT || 5000;
const URL_DB = process.env.URL_DB;
const CORS_CONFIG = {
  credentials: true,
  origin: process.env.CLIENT_URL
};
const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
const ACCESS_TOKEN_LIFE_TIME = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  httpOnly: true
};
const REFRESH_TOKEN_LIFE_TIME = {
  maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
  httpOnly: true
};
const RESET_PASSWORD_MAIL_LINK = process.env.RESET_PASSWORD_MAIL_LINK;
const RESET_PASSWORD_LINK = process.env.RESET_PASSWORD_LINK;
const MAX_IMAGE_UPLOAD = 3;
const RESULTS_PER_PAGE = 10;
const SEARCH_RESULTS = 5;

module.exports = {
  PORT,
  URL_DB,
  CORS_CONFIG,
  JWT_ACCESS_KEY,
  JWT_REFRESH_KEY,
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
  RESET_PASSWORD_MAIL_LINK,
  RESET_PASSWORD_LINK,
  MAX_IMAGE_UPLOAD,
  RESULTS_PER_PAGE,
  SEARCH_RESULTS
};