const express = require('express');

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

mongodb.initBd(err => {
  if (err) {
    console.log(err);
    return;
  }
  else{
    console.log("Connected to the database");
    app.listen(port, () => {
        console.log(`Database is listening and node running on port ${port}`);
      });
  } 
});



