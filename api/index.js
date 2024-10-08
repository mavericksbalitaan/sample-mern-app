const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "sample_guides"
      }
    );
    console.log("Connected to MongoDB");
    app.get("/", async (req, res) => {
      const planets = await mongoose.connection.db.collection("planets").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      }
      );

      res.json(planets);
    });
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB");
    console.error(error);
  }
}

connect();

module.exports = app;
