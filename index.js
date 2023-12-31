// index.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/whoami", function(req, res) {
  const ip = req.socket.remoteAddress || req.ip;
  const lang = req.headers["accept-language"];
  const userAgent = req.headers["user-agent"];
  let ipaddress;

  if (ip.startsWith('::ffff:')) {
    ipaddress = ip.substring(7)
  }

  res.status(200).send({ ipaddress: ipaddress, language: lang, software: userAgent });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
