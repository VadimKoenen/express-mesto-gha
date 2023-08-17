const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
// require('mongoose-type-url');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be at most 30, got {VALUE}'],
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    minlength: [2, 'Must be at least 2, got {VALUE}'],
    maxlength: [30, 'Must be at most 30, got {VALUE}'],
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    validate: [isURL, 'Invalid avatar URL'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    //  type: mongoose.SchemaTypes.Url,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Invalid Email'],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.methods.toJSON = function s() {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
