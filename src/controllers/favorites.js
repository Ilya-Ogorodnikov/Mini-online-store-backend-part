const ApiError = require('../helpers/api-error');
const FavoritesService = require('../services/favorites');
const TokenService = require('../services/tokens');

const checkCookies = async (cookies) => {
  const refreshToken = cookies.refreshToken;
  const userData = await TokenService.findToken(refreshToken);
  if (!userData) {
    throw ApiError.badRequest('Не валидный рефреш токен')
  }

  return userData;
}

class FavoritesController {
  async allFavorites(req, res, next) {
    try {
      const asObjects = req.query.asObjects === "true";
      const userData = await checkCookies(req.cookies);
      const data = await FavoritesService.allFavorites(userData.user, asObjects);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addFavorite(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const productId = req.query.productId;
      if (!productId) {
        throw ApiError.badRequest('Укажите productId в query')
      }

      const data = await FavoritesService.addFavorite(userData.user, productId);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteFavorite(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const productId = req.query.productId;
      if (!productId) {
        throw ApiError.badRequest('Укажите productId в query')
      }

      const data = await FavoritesService.deleteFavorite(userData.user, productId);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async syncLocalFavorite(req, res, next) {
    try {
      const userData = await checkCookies(req.cookies);
      const productIds = req.body;
      if (!productIds) {
        throw ApiError.badRequest('Локальных избранных нет, синхранизировать нечего')
      }

      const data = await FavoritesService.syncLocalFavorite(userData.user, productIds);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FavoritesController();