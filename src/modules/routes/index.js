const Router = require('express');
const router = new Router();
const usersRouter = require('./users');
const adminRouter = require('./admin');
const clientRouter = require('./client');

router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/client', clientRouter);

module.exports = router;