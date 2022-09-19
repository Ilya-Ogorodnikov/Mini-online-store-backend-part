const Router = require('express');
const purchasesRouter = new Router();
const PurchasesController = require('../../controllers/purchases');

purchasesRouter.post('/makePurchase', PurchasesController.makePurchase);

module.exports = purchasesRouter;