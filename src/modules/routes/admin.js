const Router = require('express');
const adminRouter = new Router();
const passport = require('passport');
const AdminController = require('../../controllers/admin');
const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const pickupsRouter = require('./pickup-points');


adminRouter.post('/login', AdminController.logIn);
adminRouter.use('/', 
  passport.authenticate('jwt', { session: false }), 
  categoriesRouter
);
adminRouter.use('/', 
  passport.authenticate('jwt', { session: false }),
  productsRouter
);
adminRouter.use('/', 
  passport.authenticate('jwt', { session: false }),
  pickupsRouter
);

module.exports = adminRouter;