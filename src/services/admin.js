const bcrypt = require('bcrypt');
const UserModel = require('../modules/models/user');
const TokenService = require('../services/tokens');
const ApiError = require('../helpers/api-error');
const UserDto = require('../helpers/user-dto');

class AdminService {  
  async logIn({ email, password }) {
    const user = await UserModel.findOne({ email });       
    if (!user) {
      throw ApiError.badRequest(`Пользователя ${email} не существует`);
    }
       
    if (user.isAdmin === false) {
      throw ApiError.badRequest(`Пользователь ${email} не является администратором`);
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
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
}

module.exports = new AdminService();