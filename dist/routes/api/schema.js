"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

// import client from '../../db';
const route = (0, _express.Router)();
exports.route = route;
const schema = ["Type", "Direction", "From", "To", "Extension", "Forwarded To", "Name", "Date", "Time", "Action", "Action Result", "Result Description", "Duration", "Included", "Purchased"];
route.get('/ring-central', function (req, res) {
  res.json(schema);
});