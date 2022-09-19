const StartPageService = require('../services/start-page');

class StartPageController {
  async products(req, res, next) {
    try {
      const values = {
        newProducts: req.query.new === 'true',
        categoryId: req.query.categoryId,
        productId: req.query.productId
      };

      const data = await StartPageService.products(values);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async categories(req, res, next) {
    try {
      const data = await StartPageService.categories();

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StartPageController();