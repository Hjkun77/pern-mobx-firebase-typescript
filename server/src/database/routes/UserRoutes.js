const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUser);
router.get('/:id', UserController.getAUser);
router.put('/:id', UserController.updatedUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
