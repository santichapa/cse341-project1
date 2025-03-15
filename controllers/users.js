const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const db = await mongodb.getDatabase();
  db.collection("users")
    .find()
    .toArray()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching users");
    });
};

const getUser = async (req, res) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid user ID");
      }
    const objectId = new ObjectId(userId);
    const result = await mongodb
    .getDatabase()
    .collection("users")
    .find({ _id: objectId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Error fetching user");
  });
};

module.exports = { getAllUsers, getUser };
