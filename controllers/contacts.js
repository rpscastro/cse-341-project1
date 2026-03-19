const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for getting all contacts
  mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find()
    .toArray((err, contacts) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    });
};

const getContactById = (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for getting a contact by ID
  const contactId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId })
    .toArray((err, contacts) => {
      if (err) {
        res.status(400).json({ message: err });
      } 
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
      
    });
};

const createContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for creating a new contact
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contactData);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact.",
      );
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for updating an existing contact
  const contactId = new ObjectId(req.params.id);
  const contactData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contactData);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact.",
      );
  }
};


const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
  // Implementation for deleting a contact
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact.",
      );
  }
};


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
