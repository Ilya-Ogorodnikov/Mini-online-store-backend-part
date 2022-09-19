const Router = require('express');
const catalogRouter = new Router();
const CatalogController = require('../../controllers/catalog');

catalogRouter.get('/', CatalogController.allProducts);

module.exports = catalogRouter;