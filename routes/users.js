const express = require('express'),
      router = express.Router(),
      usersController = require('../controllers/User');

router.post('/login', usersController.loginUser);
router.post('/signup', usersController.createUser);
router.post('/logout', usersController.logoutUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
