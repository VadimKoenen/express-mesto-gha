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
  CardValidation,
} = require('../middlewares/validation');

router.post('/', createCardValidation, createCard);
router.get('/', getCards);
router.delete('/:id', CardValidation, deleteCardById);
router.put('/:id/likes', CardValidation, addLike);
router.delete('/:id/likes', CardValidation, removeLike);

module.exports = router;
