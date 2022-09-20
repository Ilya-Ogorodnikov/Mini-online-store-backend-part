const CategoriesService = require('../services/categories');

class CategoriesController {
  async allCategories(req, res, next) {
    try {
      const values = { isDelete: req.query.isDelete === 'true' };
      const data = await CategoriesService.allCategories(values);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addNewCategory(req, res, next) {
    try {
      const data = await CategoriesService.addNewCategory(req.body);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async editCategory(req, res, next) {
    try {
      const data = await CategoriesService.editCategory(req.body);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async toggleIsDelete(req, res, next) {
    try {
      const data = await CategoriesService.toggleIsDelete(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesController();