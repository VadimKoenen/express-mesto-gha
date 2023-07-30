const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/consts');

// получение users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// cоздание user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка в заполнении полей' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// получение по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'User ID не найден' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Invalid user ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновление профиля
module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Неверный user_ID' });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка в заполнении полей' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновление аватара
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Неверный user_ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
