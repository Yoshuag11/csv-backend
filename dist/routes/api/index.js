"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

var _query = require("./query");

var _files = require("./files");

const route = (0, _express.Router)();
exports.route = route;
route.use('/query', _query.route);
route.use('/files', _files.route);