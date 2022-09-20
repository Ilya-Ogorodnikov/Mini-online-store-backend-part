const jwt = require('jsonwebtoken');
const tokenModel = require('../modules/models/token');
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require('../../config');
const ApiError = require('../helpers/api-error');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, 
      JWT_ACCESS_KEY, 
      { expiresIn: '15d' }
    );
    const refreshToken = jwt.sign(payload, 
      JWT_REFRESH_KEY, 
      { expiresIn: '30d' }
    );
    
    return {
      accessToken,
      refreshToken
    }
  }
  
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async findRefreshToken(userId) {
    const tokenData = await tokenModel.findOne({ user: userId });
    return tokenData.refreshToken;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }

  validateRefreshToken(token) {
    try {
      const tokenData = jwt.verify(token, JWT_REFRESH_KEY);
      return tokenData;      
    } catch (error) {
      throw ApiError.badRequest('Токен не валидный');
    }
  }
}

module.exports = new TokenService();