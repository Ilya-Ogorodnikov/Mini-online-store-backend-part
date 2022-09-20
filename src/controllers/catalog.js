const CatalogService = require('../services/catalog');

class CatalogController {
  async allProducts(req, res, next) {
    try {
      const values = {
        page: req.query.page || 0,
        searchTerm: req.query?.searchTerm
      };

      const data = await CatalogService.allProducts(values);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CatalogController();