const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');

const {
  signUpValidation,
  userValidation,
} = require('../middlewares/validation');

router.post('/signin', userValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);

module.exports = router;
