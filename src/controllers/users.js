const UserService = require('../services/users');
const TokenService = require('../services/tokens');
const MailService = require('../services/mail');
const { ACCESS_TOKEN_LIFE_TIME, REFRESH_TOKEN_LIFE_TIME, RESET_PASSWORD_LINK } = require('../../config');

class UserController {
  async signUp(req, res, next) {
    try {
      const userData = await UserService.singUp(req.body);

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

  async logIn(req, res, next) {
    try {
      const userData = await UserService.logIn(req.body);

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

  async resetPasswordMail(req, res, next) {
    try {
      const user = await UserService.findUser(req.body.email);
      const refreshToken = await TokenService.findRefreshToken(user._id);
      await MailService.sendResetPasswordMail(req.body.email, RESET_PASSWORD_LINK, refreshToken);

      return res.json({ message: 'Проверьте почту. Вам пришло письмо со ссылкой на сброс пароля' })
    } catch (error) {
      next(error);
    }
  }

  async validateUser(req, res, next) {
    try {
      const tokenData = await TokenService.validateRefreshToken(req.body.refreshToken);

      return res.json({ isValidToken: true, userId: tokenData.id });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const updatedUser = await UserService.changePassword(req.body);

      return res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

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

module.exports = new UserController();