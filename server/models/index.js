const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

if (!url) {
  console.error("MongoDB URL is not specified. Exiting...");
  process.exit();
}

const db = {
  mongoose,
  url
};

db.specs = require("./spec.model.js")(mongoose);

module.exports = db;