const { Schema, model } = require('mongoose');

const Product = new Schema({
  title: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    name: String,
    description: String
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: Boolean, 
    default: false
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = model('Products', Product);