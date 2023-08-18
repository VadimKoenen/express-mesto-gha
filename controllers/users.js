const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  CONFLICT,
} = require('../utils/consts');

// получение users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

// cоздание user
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    return next(new BAD_REQUEST('One of the fields or more is not filled'));
  }
  return bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new CONFLICT('User already is registred'));
      }
      return next(err);
    });
};

// получение по ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NOT_FOUND('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      }
      return next(err);
    });
};

// обновление профиля
module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      about: req.body.about,
      email: req.body.email,
      password: req.body.password,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      }
      return next(err);
    });
};

// обновление аватара
module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
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
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      }
      return next(err);
    });
};

// логин
module.exports.login = (req, res, next) => {
  // проверка наличия полей
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BAD_REQUEST('One of the fields or more is not filled'));
  }
  // пользователь с email
  return User.findOne({ email })
    .select('+password')
    .orFail(() => new UNAUTHORIZED('User not found'))
    .then((user) => {
      // пароль
      bcrypt.compare(password, user.password)
        .then((isOriginUser) => {
          if (isOriginUser) {
            // создать JWT
            const token = jwt.sign(
              {
                id: user._id,
              },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            );
            // кука
            res.cookie('jwt', token, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            return res.send({ data: user.toJSON() });
          }
          return next(new UNAUTHORIZED('Invalid email or password'));
        });
    })
    .catch(next);
};

// users/me
module.exports.getUserData = (req, res, next) => {
  User.findById(req.user.id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
