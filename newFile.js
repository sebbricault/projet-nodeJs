const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { app } = require("./app.js");

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());
