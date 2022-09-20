const ApiError = require('../helpers/api-error');
const TokenService = require('../services/tokens');
const CartService = require('../services/cart');

const checkCookies = async (cookies) => {
  const refreshToken = cookies.refreshToken;
  const userData = await TokenService.findToken(refreshToken);
  if (!userData) {
    throw ApiError.badRequest('Не валидный рефреш токен')
  }

  return userData;
}

class CartController {
  async cartStatus(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const asObjects = req.query.asObjects === "true";
      const data = await CartService.cartStatus(userData.user, asObjects);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const product = req.body;
      if (!product) {
        throw ApiError.badRequest('Укажите что добавить в корзину')
      }

      const data = await CartService.addToCart(userData.user, product);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteFromCart(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const values = {
        userId: userData.user.toString(),
        productId: req.query.productId,
        all: req.query.all === 'true'
      };

      const data = await CartService.deleteFromCart(values);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async syncLocalCart(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const productIds = req.body;
      if (!productIds) {
        throw ApiError.badRequest('Локальных товаров в корзине нет, синхранизировать нечего')
      }

      const data = await CartService.syncLocalCart(userData.user, productIds);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();