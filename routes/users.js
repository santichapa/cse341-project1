const express = require('express');
const router = express.Router();
const users = require('../controllers/users');



router.get('/', users.getAllUsers);

router.get('/:id', users.getUser);

module.exports = router;