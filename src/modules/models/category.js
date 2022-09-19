const { Schema, model } = require('mongoose');

const Category = new Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelete: {
    type: Boolean,
    default: false
  }
});

module.exports = model('Categories', Category);