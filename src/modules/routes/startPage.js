const Router = require('express');
const startPageRouter = new Router();
const startPageController = require('../../controllers/start-page');

startPageRouter.get('/products', startPageController.products);
startPageRouter.get('/categories', startPageController.categories);

module.exports = startPageRouter;