const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
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

module.exports = { getAllContacts, getContact
 };
