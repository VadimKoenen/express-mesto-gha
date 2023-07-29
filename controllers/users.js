const User = require('../models/user');

//получение users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

//cоздание user
module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка в заполнении полей' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

//получение по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: 'User ID не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      };
    });
};


//обновление профиля
module.exports.updateProfile = (req, res) => { // *
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: 'Неверный user_ID' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка в заполнении полей' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

//обновление аватара
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: 'Неверный user_ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
