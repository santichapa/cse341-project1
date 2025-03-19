const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initBd = (callback) => {
    if(database){
        console.log("Database is already initialized");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
        database = client.db();
        callback(null, database);
    })
    .catch(err => {
        console.log(err);
        callback(err);
    });
}

const getDatabase = () => {
    if(!database){
        console.log("Database not initialized");
        return;
    }
    return database;
}

module.exports = { initBd, getDatabase };