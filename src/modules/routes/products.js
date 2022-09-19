const Router = require('express');
const productsRouter = new Router();
const upload = require('../../middlewares/image-upload');
const ProductsController = require('../../controllers/products');
const validation = require('../../middlewares/validation');
const { productSchema, editProductSchema, toggleDeleteSchema } = require('../../helpers/validation-schemas');
const { MAX_IMAGE_UPLOAD } = require('../../../config');

productsRouter.get('/products/all', ProductsController.allProducts);
productsRouter.post('/products/add',
  upload.array('images', 3),
  validation(productSchema),
  ProductsController.addProduct
);
productsRouter.patch('/products/edit',
  upload.array('images', MAX_IMAGE_UPLOAD),
  validation(editProductSchema),
  ProductsController.editProduct
);
productsRouter.patch('/products/toggleIsDelete',
  validation(toggleDeleteSchema),
  ProductsController.toggleIsDelete
);

module.exports = productsRouter;