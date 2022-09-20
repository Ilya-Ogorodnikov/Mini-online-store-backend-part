const ProductModel = require('../modules/models/product');
const { SEARCH_RESULTS, RESULTS_PER_PAGE } = require('../../config');

class CatalogService {
  async allProducts({ page, searchTerm }) {
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'gi');
      const data = await ProductModel.find({ title: { $regex: searchRegex } }).limit(SEARCH_RESULTS);

      return data;
    }

    const data = await ProductModel.find({ isDelete: false })
      .skip(Number(page) * RESULTS_PER_PAGE)
      .limit(RESULTS_PER_PAGE);

    return data;
  }
}

module.exports = new CatalogService();