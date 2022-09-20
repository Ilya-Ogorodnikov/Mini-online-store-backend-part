const CategoryModel = require('../modules/models/category');
const ApiError = require('../helpers/api-error');

class CategoryService {
  async allCategories({ isDelete }) {
    const data = await CategoryModel.find({ isDelete });

    return data;
  }

  async addNewCategory({ title }) {
    const candidate = await CategoryModel.findOne({ title });
    if (candidate) {
      throw ApiError.badRequest('Такая категория уже существует')
    }

    const data = await CategoryModel.create({ title });

    return data;
  }

  async editCategory({ id, title }) {
    const data = await CategoryModel.findOneAndUpdate({ _id: id },
      { $set: { title } }, { new: true }
    );

    return data;
  }

  async toggleIsDelete({ id, isDelete }) {
    const data = await CategoryModel.findOneAndUpdate({ _id: id },
      { $set: { isDelete } }, { new: true }
    );

    return data;
  }
}

module.exports = new CategoryService();