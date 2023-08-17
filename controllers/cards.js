const Card = require('../models/card');
const {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
} = require('../utils/consts');

// создание карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    ...req.body,
    name,
    link,
    owner: req.user.id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      }
      return next(err);
    });
};

// получение карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// удаление
module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new NOT_FOUND('Not found'))
    .then((card) => {
      if (card.owner.toString() !== req.user.id) {
        throw new FORBIDDEN('Access is denied');
      }
      return Card.deleteOne(card);
    })
    .then(() => res.send({ message: 'Card deleted' }))
    .catch((err) => {
      if (err.message === 'Notfound') {
        return next(new NOT_FOUND('Not found'));
      } if (err.name === 'CastError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      }
      return next(err);
    });
};

// добавление лайка
module.exports.addLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user.id } },
  { new: true },
)
  .orFail(() => new NOT_FOUND('Not found'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BAD_REQUEST('Uncorrect data'));
    }
    return next(err);
  });

// удаление лайка
module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    {
      new: true,
    },
  )
    .orFail(() => new NOT_FOUND('Not found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BAD_REQUEST('Uncorrect data'));
      } return next(err);
    });
};
