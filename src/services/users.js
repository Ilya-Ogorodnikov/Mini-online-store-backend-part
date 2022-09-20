const bcrypt = require('bcrypt');
const UserModel = require('../modules/models/user');
const TokenService = require('../services/tokens');
const MailService = require('./mail');
const ApiError = require('../helpers/api-error');
const UserDto = require('../helpers/user-dto');
const { RESET_PASSWORD_MAIL_LINK } = require('../../config');

class UserService {  
  async singUp(userData) {
    const { email, password, firstName, lastName, address, phoneNumber, isAdmin } = userData;
    const candidate = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (candidate) {
      throw ApiError.badRequest('Пользователь c такой почтой или телефоном уже существует');
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashPassword, firstName, lastName, address, phoneNumber, isAdmin });
  
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens, 
      user: userDto
    }
  }

  async logIn({ email, password, browser, city, country }) {
    const user = await UserModel.findOne({ email });       
    if (!user) {
      throw ApiError.badRequest(`Пользователь c почтой ${email} не найден. Зарегистрируйтесь!`);
    }
    
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      await MailService.sendLoginErrorMail(email, RESET_PASSWORD_MAIL_LINK, browser, city, country);
      throw ApiError.badRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens, 
      user: userDto
    }
  }

  async findUser(value) {
    const user = await UserModel.findOne({ email: value });
    if (!user) {
      throw ApiError.badRequest('Такого пользователя не существует')
    } 

    return user;
  }

  async changePassword({ userId, password }) {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findOneAndUpdate({_id: userId }, { password: hashPassword });
    const userDto = new UserDto(user);

    return userDto;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens, 
      user: userDto
    }
  }
}

module.exports = new UserService();