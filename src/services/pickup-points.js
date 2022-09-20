const PickupModel = require('../modules/models/pickup-point');
const ApiError = require('../helpers/api-error');

class PickupService {
  async allPickupPoints({ isActive }) {
    const data = PickupModel.find({ isActive });

    return data;
  }

  async addPickupPoint({ title, address, coordinates, openHours }) {
    const candidate = await PickupModel.findOne({ title });
    if (candidate) {
      throw ApiError.badRequest('Пункт с таким названием уже существует')
    }

    const data = PickupModel.create({ title, address, coordinates, openHours });

    return data;
  }

  async editPickupPoint(updatedFields) {
    const data = PickupModel.findOneAndUpdate(
      { _id: updatedFields.id },
      { $set: updatedFields },
      { new: true }
    );

    return data;
  }

  async deactivatePickupPoint({ id, isActive }) {
    const data = PickupModel.findOneAndUpdate(
      { _id: id },
      { $set: { isActive } },
      { new: true }
    );

    return data;
  }
}

module.exports = new PickupService();