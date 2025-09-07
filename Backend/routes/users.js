const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const upload = require('../middleware/Upload');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', upload.single('avatar'), createUser);
router.put('/:id', upload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;