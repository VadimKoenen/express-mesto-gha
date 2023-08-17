const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  login,
  getUserData,
} = require('../controllers/users');

const {
  getUserByIdValidation,
  updateProfileDataValidation,
  updateAvatarAvatarValidation,
  userValidation,
  signinValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.post('/signin', signinValidation, login);
router.post('/', userValidation, createUser);
router.patch('/me', updateProfileDataValidation, updateProfile);
router.patch('/me/avatar', updateAvatarAvatarValidation, updateAvatar);
router.get('/me', getUserData);

module.exports = router;
