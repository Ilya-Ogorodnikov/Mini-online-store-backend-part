const ProductsService = require('../services/products');
const ProductModel = require('../modules/models/product');

class ProductsController {
  async allProducts(req, res, next) {
    try {
      const values = { isDelete: req.query.isDelete === 'true' };
      const data = await ProductsService.allProducts(values);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    try {
      const newProduct = new ProductModel({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        images: req.files.map(element => element.path),
        features: req.body.features,
        quantity: req.body.quantity
      });
      const data = await ProductsService.addProduct(newProduct);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req, res, next) {
    try {
      if (req.files.length !== 0) {
        req.body.images = req.files.map(element => element.path)
      }
      const data = await ProductsService.editProduct(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async toggleIsDelete(req, res, next) {
    try {
      const data = await ProductsService.toggleIsDelete(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();