const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const contacts = await db.db().collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    console.error("getAllContacts error", err);
    res.status(500).json({ message: err.message || err });
  }
};

const getContactById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json("Must use a valid contact id to find a contact.");
  }

  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const contact = await db
      .db()
      .collection("contacts")
      .findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (err) {
    console.error("getContactById error", err);
    res.status(500).json({ message: err.message || err });
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to update a contact.");
  }

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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to delete a contact.");
  }
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
