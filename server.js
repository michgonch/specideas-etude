const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./server/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const specsRouter = require("./server/routes/spec.routes");
app.use("/api/specs", specsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});