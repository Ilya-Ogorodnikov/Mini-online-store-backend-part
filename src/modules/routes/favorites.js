const Router = require('express');
const favoritesRouter = new Router();
const FavoritesController = require('../../controllers/favorites');

favoritesRouter.get('/all', FavoritesController.allFavorites);
favoritesRouter.post('/add', FavoritesController.addFavorite);
favoritesRouter.post('/delete', FavoritesController.deleteFavorite);
favoritesRouter.post('/sync', FavoritesController.syncLocalFavorite);

module.exports = favoritesRouter;