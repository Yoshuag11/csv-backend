"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 3001;
/**
 * Middleware setup
 */

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
/**
 * Routes
 */

app.use(_routes.route);
/**
 * Start server
 */

app.listen(port, function () {
  return console.log(`App is listening on port ${port}`);
});