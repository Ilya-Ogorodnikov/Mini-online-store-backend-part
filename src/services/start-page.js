const ProductModel = require('../modules/models/product');
const CategoryModel = require('../modules/models/category');

class StartPageService {
  async products({ newProducts, categoryId, productId }) {
    if (newProducts) {
      const data = await ProductModel.find()
        .sort({ createdAt: -1 })
        .limit(5);

      return data;
    }

    if (categoryId) {
      const data = await ProductModel.find({ category: categoryId }).limit(5);

      return data;
    }

    if (productId) {
      const data = await ProductModel.find({ _id: productId });

      return data;
    }

    return null;
  }

  async categories() {
    const data = await CategoryModel.find().limit(5);

    return data;
  }
}

module.exports = new StartPageService();