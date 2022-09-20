const UserModel = require('../modules/models/user');
const ProductModel = require('../modules/models/product');

class FavoritesService {
  async allFavorites(userId, asObjects) {
    const data = await UserModel.findOne({ _id: userId });

    if (asObjects) {
      const dataProducts = await ProductModel.find({
        _id: { $in: data.favorites }
      });

      return {
        userId: userId,
        favorites: dataProducts
      };
    }

    return {
      userId,
      favorites: data.favorites
    };
  }

  async addFavorite(userId, productId) {
    const data = await UserModel.findOneAndUpdate(
      { _id: userId.toString() },
      { $addToSet: { favorites: { _id: productId } } },
      { new: true }
    );

    return {
      userId,
      favorites: data.favorites
    };
  }

  async deleteFavorite(userId, productId) {
    const data = await UserModel.updateOne(
      { _id: userId.toString() },
      { $pull: { favorites: { _id: productId } } }
    );

    return {
      userId,
      modifiedCount: data.modifiedCount
    };
  }

  async syncLocalFavorite(userId, productIds) {
    const data = await UserModel.findOneAndUpdate(
      { _id: userId.toString() },
      { $addToSet: { favorites: productIds } },
      { new: true }
    );

    return {
      userId,
      favorites: data.favorites
    };
  }
}

module.exports = new FavoritesService();