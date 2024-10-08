const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sample_guides",
    });
    console.log("Connected to MongoDB");
    app.get("/", async (req, res) => {
      const planets = await mongoose.connection.db
        .collection("planets")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
        });

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
