const Card = require('../models/card');


//создание карточки
module.exports.createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка в заполнении полей' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

//получение карточек
module.exports.getCards = (req, res) => { // *
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

//удаление
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: 'Карточка не найдена' })
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный user_ID' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера' })
      }
    });
};

//добавление лайка
module.exports.addLike = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not found'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'Not found') {
      res.status(404).send({ message: 'Карточка не найдена' })
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'Неверный user_ID' })
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  });

//удаление лайка
module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: 'Карточка не найдена' })
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный user_ID' })
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
