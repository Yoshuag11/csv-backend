"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

var _api = require("./api");

const route = (0, _express.Router)();
exports.route = route;
route.get('/', function (req, res) {
  res.send(`API is working! with es6`);
});
route.use(_api.route);