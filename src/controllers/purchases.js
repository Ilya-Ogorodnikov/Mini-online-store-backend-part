const ApiError = require('../helpers/api-error');
const PurchaseModel = require('../modules/models/purchase');
const TokenService = require('../services/tokens');
const PurchasesService = require('../services/purchases');

class PurchasesController {
  async makePurchase(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userData = await TokenService.findToken(refreshToken);
      if (!userData) {
        throw ApiError.badRequest('Не валидный рефреш токен')
      }

      const newPurchase = new PurchaseModel({
        userId: userData.user,
        paid: req.body.paid,
        items: req.body.items,
        pickupPoint: req.body.pickupPoint
      });

      const data = await PurchasesService.makePurchase(newPurchase);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchasesController();