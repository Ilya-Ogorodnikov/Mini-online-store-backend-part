const Router = require('express');
const clientRouter = new Router();
const purchaseRouter = require('./purchases');
const favoritesRouter = require('./favorites');
const cartRouter = require('./cart');
const startPageRouter = require('./startPage');
const catalogRouter = require('./catalog');

clientRouter.use('/start', startPageRouter);
clientRouter.use('/favorites', favoritesRouter);
clientRouter.use('/cart', cartRouter);
clientRouter.use('/purchase', purchaseRouter);
clientRouter.use('/catalog', catalogRouter);

module.exports = clientRouter;