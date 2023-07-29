const router = require('express').Router();

 const {
  createCard,
  getCards,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);


module.exports = router;