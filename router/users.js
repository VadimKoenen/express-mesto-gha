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
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserData);
router.get('/:id', getUserByIdValidation, getUserById);

router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
