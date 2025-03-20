const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const db = await mongodb.getDatabase();
  db.collection("contacts")
    .find()
    .toArray()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching contacts");
    });
};

const getContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
        return res.status(400).send("Invalid contact ID");
      }
    const objectId = new ObjectId(contactId);
    const result = await mongodb
    .getDatabase()
    .collection("contacts")
    .find({ _id: objectId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Error fetching contact");
  });
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().collection("contacts").insertOne(contact);

  if (response.acknowledged > 0) {
    res.status(200).send("Contact created successfully");
  } else {
    res.status(500).json(response.error || "Error creating contact");
  }
}

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
  const response = await mongodb.getDatabase().collection("contacts").replaceOne({_id: contactId}, contact);

  if (response.modifiedCount > 0) {
    res.status(200).send("Contact updated successfully");
  } else {
    res.status(500).json(response.error || "Error updating contact");
  }
}

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection("contacts").deleteOne({_id: contactId}, true);
  if (response.deletedCount > 0) {
    res.status(200).send("Contact deleted successfully");
  }
}


module.exports = { getAllContacts, getContact, createContact, updateContact, deleteContact};
