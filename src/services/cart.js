const UserModel = require('../modules/models/user');
const ProductModel = require('../modules/models/product');
const ApiError = require('../helpers/api-error');

class CartService {
  async cartStatus(userId, asObjects) {
    const data = await UserModel.findOne({ _id: userId });

    if (asObjects) {
      const dataProducts = await ProductModel.find({
        _id: { $in: data.cart }
      });

      return {
        userId,
        cart: dataProducts
      };
    }

    return {
      userId,
      cart: data.cart
    };
  }

  async addToCart(userId, product) {
    const productDB = await ProductModel.findOne({ _id: product._id });
    if (product.quantity > productDB.quantity) {
      throw ApiError.badRequest("Товара недостаточно на складе");
    }

    const isProductInCart = await UserModel.findOne({
      $and: [
        { _id: userId },
        { cart: { $elemMatch: { _id: product._id } } }
      ]
    });

    if (!isProductInCart) {
      const data = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { cart: product } },
        { new: true }
      );

      return {
        userId,
        cart: data.cart
      };
    }

    const data = await UserModel.findOneAndUpdate(
      { _id: userId, "cart._id": product._id },
      { $set: { "cart.$.quantity": product.quantity } },
      { new: true }
    )

    return {
      userId,
      cart: data.cart
    };
  }

  async deleteFromCart({ userId, productId, all }) {
    if (all) {
      const data = await UserModel.updateOne(
        { _id: userId },
        { $set: { cart: [] } }
      )

      return {
        userId,
        modifiedCount: data.modifiedCount
      };
    }

    const data = await UserModel.updateOne(
      { _id: userId },
      { $pull: { cart: { _id: productId } } }
    )

    return {
      userId,
      modifiedCount: data.modifiedCount
    };
  }

  async syncLocalCart(userId, productIds) {
    const data = await UserModel.findOne({ _id: userId });
    const copyData = [...data.cart];

    const modifiedCart = copyData.map(item => {
      productIds.forEach(el => {
        if (el._id === item._id.toString()) {
          item.quantity = el.quantity;

          return item;
        }
      })

      return item;
    });

    const uniqueProducts = productIds.filter(({ _id: id1 }) =>
      !modifiedCart.some(({ _id: id2 }) => id1 === id2.toString())
    );

    if (uniqueProducts.length > 0) {
      const newCart = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { cart: [...modifiedCart, ...uniqueProducts] } },
        { new: true }
      );

      return {
        userId,
        cart: newCart.cart
      };
    }

    const newCart = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { cart: modifiedCart } },
      { new: true }
    );

    return {
      userId,
      cart: newCart.cart
    };
  }
}

module.exports = new CartService();