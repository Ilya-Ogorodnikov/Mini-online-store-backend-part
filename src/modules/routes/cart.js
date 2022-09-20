const Router = require('express');
const cartRouter = new Router();
const CartController = require('../../controllers/cart');

cartRouter.get('/', CartController.cartStatus);
cartRouter.post('/add', CartController.addToCart);
cartRouter.post('/delete', CartController.deleteFromCart);
cartRouter.post('/sync', CartController.syncLocalCart);

module.exports = cartRouter;