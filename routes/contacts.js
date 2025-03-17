const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');



router.get('/', contacts.getAllContacts);

router.get('/:id', contacts.getContact);

module.exports = router;