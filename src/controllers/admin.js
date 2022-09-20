const AdminService = require('../services/admin');
const { ACCESS_TOKEN_LIFE_TIME, REFRESH_TOKEN_LIFE_TIME } = require('../../config');

class AdminController {
  async logIn(req, res, next) {
    try {
      const userData = await AdminService.logIn(req.body);

      res.cookie('accessToken',
        userData.accessToken,
        ACCESS_TOKEN_LIFE_TIME
      ); 
      res.cookie('refreshToken',
        userData.refreshToken,
        REFRESH_TOKEN_LIFE_TIME
      ); 
      
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();