const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getUserData,
} = require('../controllers/users');

const {
  getUserByIdValidation,
  updateProfileDataValidation,
  updateAvatarAvatarValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', getUserByIdValidation, getUserById);
router.get('/me', getUserData);

router.patch('/me', updateProfileDataValidation, updateProfile);
router.patch('/me/avatar', updateAvatarAvatarValidation, updateAvatar);

module.exports = router;
