const Card = require('../models/card');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/consts');

// создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    ...req.body,
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка в заполнении полей' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// получение карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// удаление
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Неверный user_ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// добавление лайка
module.exports.addLike = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not found'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === 'Not found') {
      res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: 'Неверный user_ID' });
    } else {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    }
  });

// удаление лайка
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Неверный user_ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
