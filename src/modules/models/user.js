const { Schema, model } = require('mongoose');

const User = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  cart: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
    quantity: Number
  }],
  favorites: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    }
  }],
  purchases: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Purchases',
    }
  }],
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = model('Users', User);