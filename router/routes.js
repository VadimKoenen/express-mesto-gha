const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');

const {
  signInValidation,
  userValidation,
} = require('../middlewares/validation');

router.post('/signin', signInValidation, login);
router.post('/signup', userValidation, createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', userRouter);

module.exports = router;
