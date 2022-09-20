const { Schema, model } = require('mongoose');

const Token = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  refreshToken: {
    type: String,
    required: true
  }
});

module.exports = model('Tokens', Token);