const ProductModel = require('../modules/models/product');
const ApiError = require('../helpers/api-error');

class ProductsService {  
  async allProducts({ isDelete }) {
    const data = await ProductModel.find({ isDelete });

    return data;
  }
  
  async addProduct(newProduct) {
    const candidate = await ProductModel.findOne({ title: newProduct.title });
    if (candidate) {
      throw ApiError.badRequest('Такой товар в базе уже есть');
    }

    const data = await newProduct.save();
    
    return data;
  }

  async editProduct(updatedFields) {
    const data = await ProductModel.findOneAndUpdate(
      { _id: updatedFields._id }, 
      { $set: updatedFields}, 
      { new: true }
    );

    return data;
  }

  async toggleIsDelete({ id, isDelete }) {
    const data = await ProductModel.findOneAndUpdate(
      { _id: id }, 
      { $set: { isDelete }}, 
      { new: true }
    );

    return data;
  }
}

module.exports = new ProductsService();