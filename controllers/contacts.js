const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllContacts = async (req, res) => {
    // Implementation for getting all contacts
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
     });
};

const getContactById = async (req, res) => {
    // Implementation for getting a contact by ID
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
     });
};

module.exports = {
    getAllContacts,
    getContactById
};