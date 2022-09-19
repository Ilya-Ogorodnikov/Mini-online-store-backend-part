const Router = require('express');
const pickupsRouter = new Router();
const PickupsController  = require('../../controllers/pickup-points');
const validation = require('../../middlewares/validation');
const { pickupPointSchema, editPickupPointSchema } = require('../../helpers/validation-schemas');

pickupsRouter.get('/pickups/all', PickupsController.allPickupPoints);
pickupsRouter.post('/pickups/add',
  validation(pickupPointSchema),
  PickupsController.addPickupPoint
);
pickupsRouter.patch('/pickups/edit',
  validation(editPickupPointSchema),
  PickupsController.editPickupPoint
);
pickupsRouter.patch('/pickups/deactivate', PickupsController.deactivatePickupPoint);

module.exports = pickupsRouter;