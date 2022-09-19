const { Schema, model } = require('mongoose');

const PickUpPoint = new Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: String,
    required: true
  },
  openHours: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = model('PickUpPoints', PickUpPoint);