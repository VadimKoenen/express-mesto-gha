const mongoose = require('mongoose');
//require('mongoose-type-url');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be at most 30, got {VALUE}'],
  },
  link: {
    type: String,
    required: true,
    // type: mongoose.SchemaTypes.Url,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);