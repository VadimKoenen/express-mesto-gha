const mongoose = require('mongoose');
// require('mongoose-type-url');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be at most 30, got {VALUE}'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be at most 30, got {VALUE}'],
  },
  avatar: {
    type: String,
    required: true,
    //  type: mongoose.SchemaTypes.Url,
  },
});

module.exports = mongoose.model('user', userSchema);
