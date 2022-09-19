const { Schema, model } = require('mongoose');

const Purchase = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  items: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
    quantity: Number
  }],
  pickupPoint: {
    type: Schema.Types.ObjectId,
    ref: 'PickUpPoints',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Purchases', Purchase);