const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validateContact = require('../middleware/validateContact');

router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContactById);

router.post('/', validateContact.saveContact, contactsController.createContact);

router.put('/:id', validateContact.saveContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);


module.exports = router;