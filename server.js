const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const urlDataBase = {};
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/short", function (req, res, next) {
  const Originalurl = req.body.url;
  const id = crypto.randomBytes(3).toString("hex");
  urlDataBase[id] = Originalurl;
  res.send(`shortend url : ${id}`);
});

app.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const realURL = urlDataBase[id];
  if (realURL) {
    res.redirect(realURL);
  } else {
    res.status(404).send("URL not found on these id");
  }
});
app.listen(port, () => {
  console.log(`app listining on port no ${port}`);
});
