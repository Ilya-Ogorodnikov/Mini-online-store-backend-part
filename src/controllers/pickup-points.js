const PickupService = require('../services/pickup-points');

class PickupsController {
  async allPickupPoints(req, res, next) {
    try {
      const values = { isActive: req.query.isActive === 'true' };
      const data = await PickupService.allPickupPoints(values);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async addPickupPoint(req, res, next) {
    try {
      const data = await PickupService.addPickupPoint(req.body);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async editPickupPoint(req, res, next) {
    try {
      const data = await PickupService.editPickupPoint(req.body);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async deactivatePickupPoint(req, res, next) {
    try {
      const data = await PickupService.deactivatePickupPoint(req.body);
      
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PickupsController();