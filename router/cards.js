const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');

const {
  createCardValidation,
  cardValidation,
} = require('../middlewares/validation');

router.post('/', createCardValidation, createCard);
router.get('/', getCards);
router.delete('/:id', cardValidation, deleteCardById);
router.put('/:id/likes', cardValidation, addLike);
router.delete('/:id/likes', cardValidation, removeLike);

module.exports = router;
